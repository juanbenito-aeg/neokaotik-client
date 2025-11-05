import Toast, {
  BaseToastProps,
  BaseToast,
  ErrorToast,
  InfoToast,
  ToastType,
} from 'react-native-toast-message';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { VoidFunction } from '../interfaces/generics';
import { AsyncStorageKey, DeviceState, MapNavigation, Tab } from '../constants';
import { navigate } from '../RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

function setNotificationHandlers(
  updateAcolytesStatus: (email: string, isInsideTower: boolean) => void,
) {
  const unsubscribeFunctions: VoidFunction[] = [];

  unsubscribeFunctions.push(
    messaging().onMessage(async remoteMessage => {
      const { email, is_inside_tower } = remoteMessage.data || {};

      if (typeof email === 'string' && typeof is_inside_tower === 'string') {
        const isInsideTowerBoolean = is_inside_tower === 'true';
        updateAcolytesStatus(email, isInsideTowerBoolean);
      }

      Toast.show({
        type: (remoteMessage.data?.type || 'info') as ToastType,
        text1: remoteMessage.notification?.title,
        text2: remoteMessage.notification?.body,
      });
    }),
    messaging().onNotificationOpenedApp(remoteMessage => {
      moveUserToNotificationDestination(remoteMessage, DeviceState.BACKGROUND);
    }),
  );

  return () => {
    unsubscribeFunctions.forEach(unsubscribeFunction => {
      unsubscribeFunction();
    });
  };
}

async function moveUserToNotificationDestination(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage | null,
  deviceState: DeviceState,
) {
  // Check if the message/notification has been opened before, & move the user to another screen if it has not

  const lastRemoteMessageIdAndDeviceState = await AsyncStorage.getItem(
    AsyncStorageKey.LAST_REMOTE_MSG_ID_AND_DEVICE_STATE,
  );

  const currentRemoteMessageIdAndDeviceState = remoteMessage
    ? remoteMessage.messageId! + '-' + deviceState
    : '';

  if (
    lastRemoteMessageIdAndDeviceState !==
      currentRemoteMessageIdAndDeviceState &&
    (remoteMessage?.data?.destination as unknown as MapNavigation) ===
      MapNavigation.SWAMP_TOWER
  ) {
    navigate(Tab.MAP, {
      screenChangingNotificationData: {
        destination: MapNavigation.SWAMP_TOWER,
      },
    });
  }

  AsyncStorage.setItem(
    AsyncStorageKey.LAST_REMOTE_MSG_ID_AND_DEVICE_STATE,
    currentRemoteMessageIdAndDeviceState,
  );
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
  moveUserToNotificationDestination,
  getToastConfig,
  setBackgroundMessageHandler,
};
