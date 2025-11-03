import Toast, {
  BaseToastProps,
  BaseToast,
  ErrorToast,
  InfoToast,
  ToastType,
} from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import { VoidFunction } from '../interfaces/generics';
import { MapNavigation, Tab } from '../constants';
import { navigate } from '../RootNavigation';

async function updateFcmToken(userEmail: string, fcmToken: string) {
  const response = await fetch(
    `https://neokaotik-server.onrender.com/user/update/${userEmail}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pushToken: fcmToken }),
    },
  );

  const data = await response.json();
  if (response.ok) {
    console.log('FCM token updated successfully on server', data.pushToken);
  }
}

function setNotificationHandlers() {
  const unsubscribeFunctions: VoidFunction[] = [];

  unsubscribeFunctions.push(
    messaging().onMessage(async remoteMessage => {
      Toast.show({
        type: (remoteMessage.data?.type || 'info') as ToastType,
        text1: remoteMessage.notification?.title,
        text2: remoteMessage.notification?.body,
      });
    }),
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (
        (remoteMessage.data?.destination as unknown as MapNavigation) ===
        MapNavigation.SWAMP_TOWER
      ) {
        navigate(Tab.MAP, {
          screenChangingNotificationData: {
            destination: MapNavigation.SWAMP_TOWER,
          },
        });
      }
    }),
  );

  return () => {
    unsubscribeFunctions.forEach(unsubscribeFunction => {
      unsubscribeFunction();
    });
  };
}

function getToastConfig() {
  // Configuration object to adjust the layout of the default toast components
  const toastConfig = {
    success: (props: BaseToastProps) => (
      <BaseToast {...props} style={{ borderLeftColor: 'green' }} />
    ),
    error: (props: BaseToastProps) => (
      <ErrorToast {...props} style={{ borderLeftColor: 'red' }} />
    ),
    info: (props: BaseToastProps) => (
      <InfoToast {...props} style={{ borderLeftColor: 'gray' }} />
    ),
  };

  return toastConfig;
}

function setBackgroundMessageHandler() {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
}

export {
  updateFcmToken,
  setNotificationHandlers,
  getToastConfig,
  setBackgroundMessageHandler,
};
