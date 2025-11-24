import { GoogleAuth } from 'react-native-google-auth';
import styled from 'styled-components/native';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import Button from './Button';
import { ButtonBackgroundImgSrc, DEFAULT_MODAL_DATA } from '../constants';
import {
  avoidDuplicateMsgIdGlitchWhenLoggingOutAndIn,
  updateFcmToken,
} from '../helpers/fcm.helpers';
import { useModalStore } from '../store/useModalStore';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Logout = () => {
  const { user, setUser } = useContext(UserContext)!;
  const setModalData = useModalStore(state => state.setModalData);

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
