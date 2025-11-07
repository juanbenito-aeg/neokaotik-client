import styled from 'styled-components/native';
import useAdaptiveNavigation from '../hooks/use-adaptive-navigation';
import { handleNotificationPermission } from '../fcm/notificationPermission';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import Toast from 'react-native-toast-message';
import { getToastConfig } from '../helpers/fcm.helpers';
import { navigationRef } from '../RootNavigation';
import useMetrics from '../hooks/use-metrics';

const Container = styled.View`
  height: 100%;
`;

const Main = () => {
  const Navigation = useAdaptiveNavigation();

  const { user } = useContext(UserContext)!;
  handleNotificationPermission(user!.email);

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
