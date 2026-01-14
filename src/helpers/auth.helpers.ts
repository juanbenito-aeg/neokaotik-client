import type { AuthenticateUserReturnValue } from '../interfaces/auth.helpers';
import * as Keychain from 'react-native-keychain';
import { axiosInstance } from './axios.helper';
import { AuthTokenKey } from '../constants/jwt';

export async function authenticateUser(
  endpoint: string,
  idToken: string,
  fcmToken: string,
): Promise<AuthenticateUserReturnValue> {
  const authenticationAttemptResult: AuthenticateUserReturnValue = {
    statusCode: 0,
    user: null,
  };

  try {
    const response = await axiosInstance.post(`/auth/${endpoint}`, {
      idToken,
      fcmToken,
    });

    authenticationAttemptResult.user = response.data.user;
    authenticationAttemptResult.statusCode = response.status;

    const { accessToken, refreshToken } = response.data;

    if (accessToken && refreshToken) {
      await Keychain.setGenericPassword(AuthTokenKey.ACCESS, accessToken, {
        service: AuthTokenKey.ACCESS,
      });

      await Keychain.setGenericPassword(AuthTokenKey.REFRESH, refreshToken, {
        service: AuthTokenKey.REFRESH,
      });
    }
  } catch (error: any) {
    console.log('Auth error:', error.message);
  }

  return authenticationAttemptResult;
}
