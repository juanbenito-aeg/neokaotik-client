import styled from 'styled-components/native';
import useAdaptiveNavigation from '../hooks/use-adaptive-navigation';
import { handleNotificationPermission } from '../fcm/notificationPermission';
import Toast from 'react-native-toast-message';
import { getToastConfig } from '../helpers/fcm.helpers';
import { navigationRef } from '../RootNavigation';
import useMetrics from '../hooks/use-metrics';
import usePlayerStore from '../store/usePlayerStore';
import { useModalStore } from '../store/useModalStore';
import { DEFAULT_MODAL_DATA } from '../constants';

const Container = styled.View`
  height: 100%;
`;

const Main = () => {
  const user = usePlayerStore(state => state.user);

  const setModalData = useModalStore(state => state.setModalData);

  handleNotificationPermission(user!.email).then(permissionDeniedMessage => {
    if (permissionDeniedMessage) {
      setModalData({
        ...DEFAULT_MODAL_DATA,
        content: {
          message: permissionDeniedMessage,
        },
      });
    }
  });

  const Navigation = useAdaptiveNavigation();

  const { ms } = useMetrics();
  const toastConfig = getToastConfig(ms);

  return (
    <Container>
      <Navigation ref={navigationRef} />
      <Toast config={toastConfig} />
    </Container>
  );
};

export default Main;
