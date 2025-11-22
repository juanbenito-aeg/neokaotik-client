import { User, GoogleAuth, GoogleAuthScopes } from 'react-native-google-auth';
import { useState, useEffect, useRef } from 'react';
import Login from './Login';
import SplashScreen from './SplashScreen';
import { authenticateUser } from '../helpers/auth.helpers';
import Modal from './Modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import Main from './Main';
import { UserContext } from '../contexts/UserContext';
import CircleSpinner from './Spinner';
import { ModalContext } from '../contexts/ModalContext';
import KaotikaUser from '../interfaces/KaotikaUser';
import { AuthenticateUserReturnValue } from '../interfaces/auth.helpers';
import { initSocket, performSocketCleanUp } from '../socket/socket';
import { DEFAULT_MODAL_DATA, DeviceState, UserRole } from '../constants';
import AcolytesContext from '../contexts/AcolytesContext';
import IsLoadingContext from '../contexts/IsLoadingContext';
import { EventListenersCleaners } from '../interfaces/App';
import {
  listenForAcolyteDisconnected,
  listenForAcolyteInsideOutsideLab,
} from '../socket/events/angelo-lab';
import { getDeviceToken } from '../fcm/deviceToken';
import {
  setNotificationHandlers,
  handleBackgroundOrQuitNotification,
} from '../helpers/fcm.helpers';
import messaging from '@react-native-firebase/messaging';
import { ModalData } from '../interfaces/Modal';
import useMetrics from '../hooks/use-metrics';

const App = () => {
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<KaotikaUser | null>(null);
  const userRef = useRef(user);
  const [acolytes, setAcolytes] = useState<KaotikaUser[]>([]);

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
      let mortimerEventListenersCleaners: EventListenersCleaners = [];

      if (user.rol === UserRole.MORTIMER) {
        (async () => {
          mortimerEventListenersCleaners = await setMortimerUp(
            mortimerEventListenersCleaners,
          );
        })();
      }

      initSocket(user.email);

      return () => {
        setTimeout(() => {
          if (!userRef.current) {
            performSocketCleanUp(...mortimerEventListenersCleaners);
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

  async function setMortimerUp(
    mortimerEventListenersCleaners: EventListenersCleaners,
  ) {
    setIsLoading(true);

    const acolytesArray = await getAcolytes();

    setIsLoading(false);

    setAcolytes(acolytesArray);

    const clearAcolyteInsideOutsideLab = listenForAcolyteInsideOutsideLab(
      UserRole.MORTIMER,
      undefined,
      acolytesArray,
      setAcolytes,
    );

    const clearAcolyteDisconnected = listenForAcolyteDisconnected(
      acolytesArray,
      setAcolytes,
    );

    mortimerEventListenersCleaners.push(
      clearAcolyteInsideOutsideLab,
      clearAcolyteDisconnected,
    );

    return mortimerEventListenersCleaners;
  }

  async function getAcolytes(): Promise<KaotikaUser[]> {
    const url = 'https://neokaotik-server.onrender.com/user/get-acolytes/';
    const response = await fetch(url);

    let acolytesArray = [];

    if (response.ok) {
      acolytesArray = await response.json();
    }

    return acolytesArray;
  }

  return (
    <UserContext value={{ user, setUser }}>
      <SafeAreaView>
        <ModalContext value={setModalData}>
          <IsLoadingContext value={{ isLoading, setIsLoading }}>
            {isConfigured ? (
              !user ? (
                <>
                  <Login setUser={setUser} />

                  {isLoading && <CircleSpinner />}
                </>
              ) : (
                <AcolytesContext value={{ acolytes, setAcolytes }}>
                  <Main />
                </AcolytesContext>
              )
            ) : (
              <SplashScreen />
            )}
          </IsLoadingContext>
        </ModalContext>

        <Modal
          fullScreen={modalData?.fullScreen}
          content={modalData?.content}
          onPressActionButton={modalData?.onPressActionButton}
          actionButtonText={modalData?.actionButtonText}
        />
      </SafeAreaView>
    </UserContext>
  );
};

export default App;
