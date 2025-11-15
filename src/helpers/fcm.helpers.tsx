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
import {
  AsyncStorageKey,
  ButtonBackgroundImgSrc,
  DeviceState,
  MapNavigation,
  NotificationTitle,
  SocketClientToServerEvents,
  Tab,
} from '../constants';
import { navigate } from '../RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SetAcolytes } from '../interfaces/Acolytes';
import { MS } from '../interfaces/Metrics';
import { ModalData, SetModalData } from '../interfaces/Modal';
import { socket } from '../socket/socket';

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
  setAcolytes: SetAcolytes,
  setModalData: SetModalData,
  ms: MS,
) {
  const unsubscribeFunctions: VoidFunction[] = [];

  unsubscribeFunctions.push(
    messaging().onMessage(remoteMessage => {
      handleForegroundNotification(
        setAcolytes,
        setModalData,
        ms,
        remoteMessage,
      );
    }),
    messaging().onNotificationOpenedApp(remoteMessage => {
      handleBackgroundOrQuitNotification(
        setModalData,
        ms,
        remoteMessage,
        DeviceState.BACKGROUND,
        setAcolytes,
      );
    }),
  );

  return () => {
    unsubscribeFunctions.forEach(unsubscribeFunction => {
      unsubscribeFunction();
    });
  };
}

function handleForegroundNotification(
  setAcolytes: SetAcolytes,
  setModalData: SetModalData,
  ms: MS,
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) {
  const notificationTitle = remoteMessage.notification!.title;

  switch (notificationTitle) {
    case NotificationTitle.SWAMP_TOWER: {
      updateAcolyteEnteringOrExitingSwampTower(setAcolytes, remoteMessage);
      break;
    }

    case NotificationTitle.ACOLYTE_DISCOVERY: {
      const modalData = getNotificationModalData(
        notificationTitle,
        ms,
        setModalData,
      );
      return setModalData(modalData);
    }
  }

  Toast.show({
    type: (remoteMessage.data?.type || 'info') as ToastType,
    text1: remoteMessage.notification?.title,
    text2: remoteMessage.notification?.body,
  });
}

function handleBackgroundOrQuitNotification(
  setModalData: SetModalData,
  ms: MS,
  remoteMessage: FirebaseMessagingTypes.RemoteMessage | null,
  deviceState: DeviceState,
  setAcolytes?: SetAcolytes,
) {
  const notificationTitle = remoteMessage?.notification!.title;

  if (notificationTitle === NotificationTitle.ACOLYTE_DISCOVERY) {
    const modalData = getNotificationModalData(
      notificationTitle,
      ms,
      setModalData,
    );
    setModalData(modalData);
  } else {
    if (
      notificationTitle === NotificationTitle.SWAMP_TOWER &&
      deviceState === DeviceState.BACKGROUND
    ) {
      updateAcolyteEnteringOrExitingSwampTower(setAcolytes!, remoteMessage!);
    }

    moveUserToNotificationDestination(remoteMessage, deviceState);
  }
}

function updateAcolyteEnteringOrExitingSwampTower(
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

function getNotificationModalData(
  notificationTitle: NotificationTitle,
  ms: MS,
  setModalData: SetModalData,
): ModalData {
  let modalData: ModalData;

  switch (notificationTitle) {
    case NotificationTitle.ACOLYTE_DISCOVERY: {
      modalData = {
        fullScreen: true,
        content: {
          image: {
            source: ButtonBackgroundImgSrc.SCROLL,
            width: ms(200, 1),
            height: ms(200, 1),
          },
        },
        onPressActionButton() {
          socket.emit(SocketClientToServerEvents.REMOVE_SPELL_PRESS);
          setModalData(null);
        },
        actionButtonText: 'Remove spell',
      };
      break;
    }
  }

  return modalData!;
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
  handleBackgroundOrQuitNotification,
  getToastConfig,
  setBackgroundMessageHandler,
  avoidDuplicateMsgIdGlitchWhenLoggingOutAndIn,
};
