import { GoogleAuth } from 'react-native-google-auth';
import styled from 'styled-components/native';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import Button from './Button';
import { ButtonBackgroundImgSrc } from '../constants';
import { updateFcmToken } from '../helpers/fcm.helpers';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Logout = () => {
  const { user, setUser } = useContext(UserContext)!;
  const setGeneralModalMessage = useContext(ModalContext)!;

  async function logOut() {
    await GoogleAuth.signOut();
    await updateFcmToken(user!.email, '');
    setUser(null);
    setGeneralModalMessage('The gate closes behind you.\nSession over.');
  }

  return (
    <Container>
      <Button
        onPress={logOut}
        backgroundImgSrc={ButtonBackgroundImgSrc.DEFAULT_THEMED}
        text={'Log out'}
      />
    </Container>
  );
};

export default Logout;
