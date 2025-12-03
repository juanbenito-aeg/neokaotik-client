import { GoogleAuth } from 'react-native-google-auth';
import styled from 'styled-components/native';
import { authenticateUser } from '../helpers/auth.helpers';
import Button from './Button';
import { AuthenticateUserReturnValue } from '../interfaces/auth.helpers';
import { ButtonBackgroundImgSrc, DEFAULT_MODAL_DATA } from '../constants';
import { getDeviceToken } from '../fcm/deviceToken';
import { useModalStore } from '../store/useModalStore';
import { ModalData } from '../interfaces/Modal';
import usePlayerStore from '../store/usePlayerStore';
import { useIsLoadingStore } from '../store/useIsLoadingStore';

const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  const setModalData = useModalStore(state => state.setModalData);
  const setIsLoading = useIsLoadingStore(state => state.setIsLoading);
  const setUser = usePlayerStore(state => state.setUser);

  async function logIn() {
    const modalData: ModalData = { ...DEFAULT_MODAL_DATA };

    try {
      setIsLoading(true);

      const loginAttemptResult = await GoogleAuth.signIn();

      if (loginAttemptResult.type === 'success') {
        const idToken: string = loginAttemptResult.data.idToken;
        const fcmToken: string = await getDeviceToken();

        const authenticationAttemptResult: AuthenticateUserReturnValue =
          await authenticateUser('log-in', idToken, fcmToken);

        if (authenticationAttemptResult.statusCode <= 201) {
          setUser(authenticationAttemptResult.user!);
        } else {
          await GoogleAuth.signOut();

          if (authenticationAttemptResult.statusCode === 500) {
            modalData.content!.message =
              'Alas! Your identity could not be verified.';
          } else {
            modalData.content!.message = 'Get out of here! You are not worthy.';
          }

          setModalData(modalData);
        }
      }
    } catch (err) {
      modalData.content!.message =
        'Oh no! The authentication process with your Google account failed.';
      setModalData(modalData);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BackgroundImage
      source={require('../../public/images/old-school-entrance.png')}
    >
      <Button
        onPress={logIn}
        backgroundImgSrc={ButtonBackgroundImgSrc.DEFAULT_THEMED}
        text={'Log in with Google'}
      />
    </BackgroundImage>
  );
};

export default Login;
