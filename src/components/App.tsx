import { User, GoogleAuth, GoogleAuthScopes } from 'react-native-google-auth';
import { useState, useEffect, useRef } from 'react';
import Login from './Login';
import SplashScreen from './SplashScreen';
import { authenticateUser } from '../helpers/auth.helpers';
import Modal from './Modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import Main from './Main';
import CircleSpinner from './Spinner';
import KaotikaUser from '../interfaces/KaotikaUser';
import { AuthenticateUserReturnValue } from '../interfaces/auth.helpers';
import { initSocket } from '../socket/socket';
import { DEFAULT_MODAL_DATA, DeviceState, UserRole } from '../constants';
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
import { Artifact } from '../interfaces/Artifact';
import useArtifactStore from '../store/useArtifactStore';

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

  const setArtifacts = useArtifactStore(state => state.setArtifacts);

  const { ms } = useMetrics();

  DEFAULT_MODAL_DATA.onPressActionButton = () => {
    setModalData(null);
  };

  useEffect(() => {
    setTimeout(() => {
      configureGoogleAuth();
    }, 3000);
  }, []);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    if (user) {
      (async () => {
        setIsLoading(true);

        // Make calls to the API to get acolytes & artifacts & save them locally

        const acolytesArray = (await getXArray(
          'https://neokaotik-server.onrender.com/user/get-acolytes/',
        )) as KaotikaUser[];
        setAcolytes(acolytesArray);

        if (user.rol === UserRole.ACOLYTE || user.rol === UserRole.MORTIMER) {
          const artifactsArray = (await getXArray(
            'https://neokaotik-server.onrender.com/api/artifacts/',
          )) as Artifact[];
          setArtifacts(artifactsArray);
        }

        setIsLoading(false);
      })();
    }
  }, [user]);

  async function getXArray(url: string): Promise<KaotikaUser[] | Artifact[]> {
    const response = await fetch(url);

    let xArray = [];

    if (response.ok) {
      xArray = await response.json();
    }

    return xArray;
  }

  useEffect(() => {
    if (user) {
      const performSocketCleanUp = initSocket(
        setModalData,
        user,
        setUser,
        acolytes,
        setAcolytes,
      );

      return () => {
        // Avoid socket disconnection every time user state is updated
        setTimeout(() => {
          if (!userRef.current) {
            performSocketCleanUp();
          }
        }, 0);
      };
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const unsubscribe = setNotificationHandlers(
        setAcolytes,
        setModalData,
        ms,
        user,
        setUser,
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
      <Modal
        fullScreen={modalData?.fullScreen}
        content={modalData?.content}
        onPressActionButton={modalData?.onPressActionButton}
        actionButtonText={modalData?.actionButtonText}
      />

      {isConfigured ? (
        !user ? (
          <>
            <Login />

            {isLoading && <CircleSpinner />}
          </>
        ) : (
          <Main />
        )
      ) : (
        <SplashScreen />
      )}
    </SafeAreaView>
  );
};

export default App;
