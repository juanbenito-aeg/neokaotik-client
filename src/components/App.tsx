import { User, GoogleAuth, GoogleAuthScopes } from 'react-native-google-auth';
import { useState, useEffect, useRef } from 'react';
import Login from './Login';
import SplashScreen from './SplashScreen';
import { authenticateUser } from '../helpers/auth.helpers';
import Modal from './Modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import Main from './Main';
import CircleSpinner from './Spinner';
import { AuthenticateUserReturnValue } from '../interfaces/auth.helpers';
import { initSocket } from '../socket/socket';
import { DEFAULT_MODAL_DATA } from '../constants/general';
import { DeviceState } from '../constants/fcm';
import { getDeviceToken } from '../fcm/deviceToken';
import {
  setNotificationHandlers,
  handleBackgroundOrQuitNotification,
} from '../helpers/fcm.helpers';
import messaging from '@react-native-firebase/messaging';
import useMetrics from '../hooks/use-metrics';
import usePlayerStore from '../store/usePlayerStore';
import { useModalStore } from '../store/useModalStore';
import { useIsLoadingStore } from '../store/useIsLoadingStore';
import useArtifactStore from '../store/useArtifactStore';
import { useHallOfSageStore } from '../store/useHallOfSageStore';

const App = () => {
  const [isConfigured, setIsConfigured] = useState<boolean>(false);

  const modalData = useModalStore(state => state.modalData);
  const setModalData = useModalStore(state => state.setModalData);

  const isLoading = useIsLoadingStore(state => state.isLoading);
  const setIsLoading = useIsLoadingStore(state => state.setIsLoading);

  const user = usePlayerStore(state => state.user);
  const setUser = usePlayerStore(state => state.setUser);

  const userRef = useRef(user);

  const acolytes = usePlayerStore(state => state.acolytes);
  const setAcolytes = usePlayerStore(state => state.setAcolytes);

  const setNonAcolytes = usePlayerStore(state => state.setNonAcolytes);

  const setArtifacts = useArtifactStore(state => state.setArtifacts);

  const setShowArtifactsAnimation = useHallOfSageStore(
    state => state.setShowArtifactsAnimation,
  );

  const setShowAngeloAnimation = useHallOfSageStore(
    state => state.setShowAngeloAnimation,
  );

  const setAngeloTrialState = useHallOfSageStore(
    state => state.setAngeloTrialState,
  );

  const setAngeloTrialVotes = useHallOfSageStore(
    state => state.setAngeloTrialVotes,
  );

  const { ms } = useMetrics();

  DEFAULT_MODAL_DATA.onPressActionButtonOne = () => {
    setModalData(null);
  };

  useEffect(() => {
    setTimeout(() => {
      configureGoogleAuth();
    }, 3000);
  }, []);

  useEffect(() => {
    if (user) {
      const performSocketCleanUp = initSocket(
        ms,
        setModalData,
        user,
        setUser,
        acolytes,
        setAcolytes,
        setNonAcolytes,
        setArtifacts,
        setShowArtifactsAnimation,
        setIsLoading,
        setShowAngeloAnimation,
        setAngeloTrialState,
        setAngeloTrialVotes,
      );

      return () => {
        performSocketCleanUp(userRef);
      };
    }
  }, [user, acolytes]);

  useEffect(() => {
    userRef.current = user;

    if (user) {
      const unsubscribe = setNotificationHandlers(
        setAcolytes,
        setModalData,
        ms,
        user,
        setUser,
        setNonAcolytes,
        setAngeloTrialState,
      );

      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          handleBackgroundOrQuitNotification(
            setModalData,
            ms,
            remoteMessage,
            DeviceState.QUIT,
            setAcolytes,
            user,
            setUser,
          );
        });

      return unsubscribe;
    }
  }, [user]);

  async function configureGoogleAuth() {
    await GoogleAuth.configure({
      webClientId:
        '756692371231-2jkqbns00q59rv5353e741et9nfh4r1s.apps.googleusercontent.com',
      scopes: [GoogleAuthScopes.EMAIL],
    });

    // Check if user is already signed in
    const currentUser: User | null = await GoogleAuth.getCurrentUser();

    if (currentUser) {
      const idToken: string = await getIdToken();
      const fcmToken: string = await getDeviceToken();

      const authenticationAttemptResult: AuthenticateUserReturnValue =
        await authenticateUser('access-logged-in', idToken, fcmToken);

      if (authenticationAttemptResult.statusCode === 200) {
        setUser(authenticationAttemptResult.user);
      } else {
        await GoogleAuth.signOut();

        setModalData({
          ...DEFAULT_MODAL_DATA,
          content: {
            message:
              'Whoops! You have been logged out because your identity could not be verified.',
          },
        });
      }
    }

    setIsConfigured(true);
  }

  async function getIdToken(): Promise<string> {
    let tokens = await GoogleAuth.getTokens();

    const isIdTokenExpiredOrWillExpireSoon: boolean =
      tokens.expiresAt! - Date.now() <= 300000;

    if (isIdTokenExpiredOrWillExpireSoon) {
      tokens = await GoogleAuth.refreshTokens();
    }

    const { idToken } = tokens;

    return idToken;
  }

  return (
    <SafeAreaView>
      {isLoading && <CircleSpinner />}

      <Modal
        fullScreen={modalData?.fullScreen}
        content={modalData?.content}
        onPressActionButtonOne={modalData?.onPressActionButtonOne}
        actionButtonTextOne={modalData?.actionButtonTextOne}
        onPressActionButtonTwo={modalData?.onPressActionButtonTwo}
        actionButtonTextTwo={modalData?.actionButtonTextTwo}
      />

      {isConfigured ? !user ? <Login /> : <Main /> : <SplashScreen />}
    </SafeAreaView>
  );
};

export default App;
