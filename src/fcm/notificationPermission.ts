import { deviceTokenToRefresh } from './deviceToken';
import { useContext } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import { PermissionsAndroid } from 'react-native';

export async function handleNotificationPermission(userEmail: string) {
  const setGeneralModalMessage = useContext(ModalContext)!;
  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );

  if (hasPermission) {
    deviceTokenToRefresh(userEmail);
    return;
  }

  if (result === PermissionsAndroid.RESULTS.GRANTED) {
    deviceTokenToRefresh(userEmail);
    return;
  } else if (result === PermissionsAndroid.RESULTS.DENIED) {
    setGeneralModalMessage(
      'You have to enable notifications from system settings to receive alerts.',
    );
  }
}
