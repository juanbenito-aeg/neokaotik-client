import type { AuthenticateUserReturnValue } from '../interfaces/auth.helpers';
import { axiosInstance } from './axios.helper';
import { setAccessAndRefreshTokens } from './jwt.helpers';

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
      await setAccessAndRefreshTokens(accessToken, refreshToken);
    }
  } catch (error: any) {
    console.log('Auth error:', error.message);
  }

  return authenticationAttemptResult;
}
