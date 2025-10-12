import { User, GoogleAuth, GoogleAuthScopes } from 'react-native-google-auth';
import { useState, useEffect } from 'react';
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

const App = () => {
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [user, setUser] = useState<KaotikaUser | null>(null);
  const [acolytes, setAcolytes] = useState<KaotikaUser[]>([]);
  const [generalModalMessage, setGeneralModalMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      configureGoogleAuth();
    }, 3000);
  }, []);

  useEffect(() => {
    if (user) {
      if (user.rol === UserRole.MORTIMER) {
        (async () => {
          const acolytesArray = await getAcolytes();

          setAcolytes(acolytesArray);
        })();
      }

      initSocket(user.email);

      return performSocketCleanUp;
    }
  }, [user]);

  async function configureGoogleAuth() {
    await GoogleAuth.configure({
      webClientId:
        '68777880712-79pl25jsa37639ibme1back16g29surs.apps.googleusercontent.com',
      scopes: [GoogleAuthScopes.EMAIL],
    });

    // Check if user is already signed in
    const currentUser: User | null = await GoogleAuth.getCurrentUser();

    if (currentUser) {
      const idToken: string = await getIdToken();

      const authenticationAttemptResult: AuthenticateUserReturnValue =
        await authenticateUser('access-logged-in', idToken);

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
      tokens.expiresAt - Date.now() <= 300000;

    if (isIdTokenExpiredOrWillExpireSoon) {
      tokens = await GoogleAuth.refreshTokens();
    }

    const { idToken } = tokens;

    return idToken;
  }

  async function getAcolytes(): Promise<KaotikaUser[]> {
    const url = 'https://cej-server.onrender.com/user/get-acolytes/';
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

        {isConfigured ? (
          !user ? (
            <>
              <Login
                setUser={setUser}
                setGeneralModalMessage={setGeneralModalMessage}
                setIsLoading={setIsLoading}
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
      </SafeAreaView>
    </UserContext>
  );
};

export default App;
