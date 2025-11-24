import { deviceTokenToRefresh } from './deviceToken';
import { PermissionsAndroid } from 'react-native';
import { DEFAULT_MODAL_DATA } from '../constants';
import { useModalStore } from '../store/useModalStore';

export async function handleNotificationPermission(userEmail: string) {
  const setModalData = useModalStore(state => state.setModalData);

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );

  if (hasPermission) {
    deviceTokenToRefresh(userEmail);
    return;
  }
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );

  if (result === PermissionsAndroid.RESULTS.GRANTED) {
    deviceTokenToRefresh(userEmail);
    return;
  } else if (result === PermissionsAndroid.RESULTS.DENIED) {
    setModalData({
      ...DEFAULT_MODAL_DATA,
      content: {
        message:
          'You have to enable notifications from system settings to receive alerts.',
      },
    });
  }
}
