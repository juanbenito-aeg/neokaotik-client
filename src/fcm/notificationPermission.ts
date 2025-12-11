import { deviceTokenToRefresh } from './deviceToken';
import { PermissionsAndroid } from 'react-native';

export async function handleNotificationPermission(
  userEmail: string,
): Promise<void | string> {
  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );

  if (hasPermission) {
    deviceTokenToRefresh(userEmail);
  } else {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      deviceTokenToRefresh(userEmail);
    } else if (result === PermissionsAndroid.RESULTS.DENIED) {
      const permissionDeniedMessage =
        'You have to enable notifications from system settings to receive alerts.';
      return permissionDeniedMessage;
    }
  }
}
