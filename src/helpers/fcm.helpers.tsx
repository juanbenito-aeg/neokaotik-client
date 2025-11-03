import {
  BaseToastProps,
  BaseToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';

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

export { updateFcmToken, getToastConfig };
