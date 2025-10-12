import { GoogleAuth } from 'react-native-google-auth';
import styled from 'styled-components/native';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import Button from './Button';
import { ButtonBackgroundImgSrc } from '../constants';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Logout = () => {
  const { setUser } = useContext(UserContext);
  const setGeneralModalMessage = useContext(ModalContext)!;

  async function logOut() {
    await GoogleAuth.signOut();
    setUser(null);
    setGeneralModalMessage('The gate closes behind you.\nSession over.');
  }

  return (
    <Container>
      <Button
        onPress={logOut}
        backgroundImgSrc={ButtonBackgroundImgSrc.ACOLYTE_THEMED}
        text={'Log out'}
      />
    </Container>
  );
};

export default Logout;
