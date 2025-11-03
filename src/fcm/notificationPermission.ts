import { getDeviceToken } from './deviceToken';
import { useContext } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import { PermissionsAndroid } from 'react-native';

export async function handleNotificationPermission() {
  const setGeneralModalMessage = useContext(ModalContext)!;
  const fcmToken = await getDeviceToken();
  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );

  if (hasPermission) {
    return fcmToken;
  }

  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );

  if (result === PermissionsAndroid.RESULTS.GRANTED) {
    return fcmToken;
  } else {
    setGeneralModalMessage(
      'You have to enable notifications from system settings to receive alerts.',
    );
    return '';
  }
}
