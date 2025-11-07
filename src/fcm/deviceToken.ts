import messaging from '@react-native-firebase/messaging';
import { updateFcmToken } from '../helpers/fcm.helpers';

export async function getDeviceToken() {
  try {
    const fcmToken = await messaging().getToken();

    if (fcmToken) {
      console.log('FCM Token:', fcmToken);
      return fcmToken;
    } else {
      console.log('No FCM token found');
      return '';
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return '';
  }
}

export function deviceTokenToRefresh(userEmail: string) {
  messaging().onTokenRefresh(fcmToken => {
    console.log('Automatically refreshed FCM token:', fcmToken);
    updateFcmToken(userEmail, fcmToken);
  });
}
