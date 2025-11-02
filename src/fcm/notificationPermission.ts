import messaging from '@react-native-firebase/messaging';
import { getDeviceToken } from './deviceToken';
import { useContext } from 'react';
import { ModalContext } from '../contexts/ModalContext';

export async function handleNotificationPermission() {
  const currentPermission = await messaging().hasPermission();
  const newStatus = await messaging().requestPermission();
  const setGeneralModalMessage = useContext(ModalContext)!;

  if (currentPermission === messaging.AuthorizationStatus.AUTHORIZED) {
    await getDeviceToken();
    return;
  }

  if (newStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    await getDeviceToken();
  } else {
    setGeneralModalMessage(
      'Mortimer, you have to enable notifications from system settings to receive alerts',
    );
  }
}
