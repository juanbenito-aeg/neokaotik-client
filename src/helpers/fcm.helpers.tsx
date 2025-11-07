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
import { SetAcolytes } from '../interfaces/Acolytes';
import { MS } from '../interfaces/Metrics';

async function updateFcmToken(userEmail: string, fcmToken: string) {
  const response = await fetch(
    `http://10.50.0.50:6000/user/update/${userEmail}`,
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

function setNotificationHandlers(setAcolytes: SetAcolytes) {
  const unsubscribeFunctions: VoidFunction[] = [];

  unsubscribeFunctions.push(
    messaging().onMessage(remoteMessage => {
      updateAffectedAcolyte(setAcolytes, remoteMessage);

      Toast.show({
        type: (remoteMessage.data?.type || 'info') as ToastType,
        text1: remoteMessage.notification?.title,
        text2: remoteMessage.notification?.body,
      });
    }),
    messaging().onNotificationOpenedApp(remoteMessage => {
      updateAffectedAcolyte(setAcolytes, remoteMessage);
      moveUserToNotificationDestination(remoteMessage, DeviceState.BACKGROUND);
    }),
  );

  return () => {
    unsubscribeFunctions.forEach(unsubscribeFunction => {
      unsubscribeFunction();
    });
  };
}

function updateAffectedAcolyte(
  setAcolytes: SetAcolytes,
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) {
  const { email, is_inside_tower } = remoteMessage.data || {};

  if (email && is_inside_tower) {
    const isInsideTowerAsBoolean = is_inside_tower === 'true';

    setAcolytes(prevAcolytes => {
      return prevAcolytes.map(acolyte => {
        if (acolyte.email === email) {
          return { ...acolyte, is_inside_tower: isInsideTowerAsBoolean };
        }

        return acolyte;
      });
    });
  }
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

function getToastConfig(ms: MS) {
  // Configuration object to adjust the layout of the default toast components
  const toastConfig = {
    success: (props: BaseToastProps) => (
      <BaseToast {...props} {...getToastCustomProps(ms, 'green')} />
    ),
    error: (props: BaseToastProps) => (
      <ErrorToast {...props} {...getToastCustomProps(ms, 'red')} />
    ),
    info: (props: BaseToastProps) => (
      <InfoToast {...props} {...getToastCustomProps(ms, 'gray')} />
    ),
  };

  return toastConfig;
}

function getToastCustomProps(ms: MS, borderLeftColor: string) {
  const toastCustomProps: BaseToastProps = {
    style: {
      width: ms(325, 0.7),
      height: ms(100, 0.6),
      borderLeftWidth: ms(5, 0.5),
      borderLeftColor,
    },
    text1Style: {
      fontSize: ms(20, 0.75),
      fontFamily: 'KochAltschrift',
      fontWeight: 'normal',
    },
    text2Style: {
      fontSize: ms(18, 0.75),
      fontFamily: 'KochAltschrift',
      color: '#5f5f5fff',
    },
    text2NumberOfLines: 2,
  };

  return toastCustomProps;
}

function setBackgroundMessageHandler() {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
}

async function avoidDuplicateMsgIdGlitchWhenLoggingOutAndIn() {
  const lastRemoteMessageIdAndDeviceState = await AsyncStorage.getItem(
    AsyncStorageKey.LAST_REMOTE_MSG_ID_AND_DEVICE_STATE,
  );

  if (lastRemoteMessageIdAndDeviceState?.includes(DeviceState.BACKGROUND)) {
    const lastRemoteMessageIdAndTweakedDeviceState =
      lastRemoteMessageIdAndDeviceState.replace(
        DeviceState.BACKGROUND,
        DeviceState.QUIT,
      );

    AsyncStorage.setItem(
      AsyncStorageKey.LAST_REMOTE_MSG_ID_AND_DEVICE_STATE,
      lastRemoteMessageIdAndTweakedDeviceState,
    );
  }
}

export {
  updateFcmToken,
  setNotificationHandlers,
  moveUserToNotificationDestination,
  getToastConfig,
  setBackgroundMessageHandler,
  avoidDuplicateMsgIdGlitchWhenLoggingOutAndIn,
};
