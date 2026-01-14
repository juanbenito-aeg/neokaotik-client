import { GoogleAuth } from 'react-native-google-auth';
import styled from 'styled-components/native';
import Button from './Button';
import { DEFAULT_MODAL_DATA } from '../constants/general';
import { MapNavigation } from '../constants/navigation';
import { ButtonBackgroundImgSrc } from '../constants/image-sources';
import {
  avoidDuplicateMsgIdGlitchWhenLoggingOutAndIn,
  updateFcmToken,
} from '../helpers/fcm.helpers';
import usePlayerStore from '../store/usePlayerStore';
import { useModalStore } from '../store/useModalStore';
import useMapStore from '../store/useMapStore';
import * as Keychain from 'react-native-keychain';
import { AuthTokenKey } from '../constants/jwt';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Logout = () => {
  const setModalData = useModalStore(state => state.setModalData);

  const user = usePlayerStore(state => state.user);
  const setUser = usePlayerStore(state => state.setUser);

  const setMapNavigation = useMapStore(state => state.setMapNavigation);

  async function logOut() {
    Keychain.resetGenericPassword({ service: AuthTokenKey.ACCESS });
    Keychain.resetGenericPassword({ service: AuthTokenKey.REFRESH });

    await GoogleAuth.signOut();
    await updateFcmToken(user!.email, '');
    await avoidDuplicateMsgIdGlitchWhenLoggingOutAndIn();
    setMapNavigation(MapNavigation.MAP);
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
