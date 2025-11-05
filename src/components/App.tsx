import { User, GoogleAuth, GoogleAuthScopes } from 'react-native-google-auth';
import { useState, useEffect, useRef, useCallback } from 'react';
import Login from './Login';
import SplashScreen from './SplashScreen';
import { authenticateUser } from '../helpers/auth.helpers';
import GeneralModal from './GeneralModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import Main from './Main';
import { UserContext } from '../contexts/UserContext';
import CircleSpinner from './Spinner';
import { ModalContext } from '../contexts/ModalContext';
import KaotikaUser from '../interfaces/KaotikaUser';
import { AuthenticateUserReturnValue } from '../interfaces/auth.helpers';
import { initSocket, performSocketCleanUp } from '../socket/socket';
import { UserRole } from '../constants';
import AcolytesContext from '../contexts/AcolytesContext';
import IsLoadingContext from '../contexts/IsLoadingContext';
import { EventListenersCleaners } from '../interfaces/App';
import {
  listenForAcolyteDisconnected,
  listenForAcolyteInsideOutsideLab,
} from '../socket/events/angelo-lab';
import { getDeviceToken } from '../fcm/deviceToken';
import {
  moveUserToNotificationDestination,
  setNotificationHandlers,
} from '../helpers/fcm.helpers';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const [generalModalMessage, setGeneralModalMessage] = useState<string>('');
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<KaotikaUser | null>(null);
  const userRef = useRef(user);
  const [acolytes, setAcolytes] = useState<KaotikaUser[]>([]);

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

  const updateAcolytesStatus = useCallback(
    (email: string, isInsideTower: boolean) => {
      setAcolytes(prevAcolytes => {
        return prevAcolytes.map(acolyte => {
          if (acolyte.email === email) {
            return { ...acolyte, is_inside_tower: isInsideTower };
          }
          return acolyte;
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (user) {
      const unsubscribe = setNotificationHandlers(updateAcolytesStatus);

      messaging()
        .getInitialNotification()
        .then(moveUserToNotificationDestination);

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

        setGeneralModalMessage(
          'Whoops! You have been logged out because your identity could not be verified.',
        );
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
        <GeneralModal
          message={generalModalMessage}
          setMessage={setGeneralModalMessage}
        />

        <IsLoadingContext value={{ isLoading, setIsLoading }}>
          {isConfigured ? (
            !user ? (
              <>
                <Login
                  setUser={setUser}
                  setGeneralModalMessage={setGeneralModalMessage}
                />

                {isLoading && <CircleSpinner />}
              </>
            ) : (
              <AcolytesContext value={{ acolytes, setAcolytes }}>
                <ModalContext value={setGeneralModalMessage}>
                  <Main />
                </ModalContext>
              </AcolytesContext>
            )
          ) : (
            <SplashScreen />
          )}
        </IsLoadingContext>
      </SafeAreaView>
    </UserContext>
  );
};

export default App;
