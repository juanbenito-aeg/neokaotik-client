import styled from 'styled-components/native';
import useAdaptiveNavigation from '../hooks/use-adaptive-navigation';
import { handleNotificationPermission } from '../fcm/notificationPermission';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import Toast from 'react-native-toast-message';

const Container = styled.View`
  height: 100%;
`;

const Main = () => {
  const Navigation = useAdaptiveNavigation();

  const { user } = useContext(UserContext)!;
  handleNotificationPermission(user!.email);

  return (
    <Container>
      <Navigation />
      <Toast />
    </Container>
  );
};

export default Main;
