import { deviceTokenToRefresh } from './deviceToken';
import { useContext } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import { PermissionsAndroid } from 'react-native';
import { ModalActionButtonText } from '../constants';

export async function handleNotificationPermission(userEmail: string) {
  const setModalData = useContext(ModalContext)!;

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
    setModalData({
      fullScreen: false,
      content: {
        message:
          'You have to enable notifications from system settings to receive alerts.',
      },
      onPressActionButton() {
        setModalData(null);
      },
      actionButtonText: ModalActionButtonText.DISMISS,
    });
  }
}
