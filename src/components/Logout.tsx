import { GoogleAuth } from 'react-native-google-auth';
import styled from 'styled-components/native';
import { useContext } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import Button from './Button';
import { ButtonBackgroundImgSrc, DEFAULT_MODAL_DATA } from '../constants';
import {
  avoidDuplicateMsgIdGlitchWhenLoggingOutAndIn,
  updateFcmToken,
} from '../helpers/fcm.helpers';
import usePlayerStore from '../store/usePlayerStore';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Logout = () => {
  const user = usePlayerStore(state => state.user);
  const setUser = usePlayerStore(state => state.setUser);

  const setModalData = useContext(ModalContext)!;

  async function logOut() {
    await GoogleAuth.signOut();
    await updateFcmToken(user!.email, '');
    await avoidDuplicateMsgIdGlitchWhenLoggingOutAndIn();
    setUser(null);
    setModalData({
      ...DEFAULT_MODAL_DATA,
      content: { message: 'The gate closes behind you.\nSession over.' },
    });
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
