import type { AuthenticateUserReturnValue } from '../interfaces/auth.helpers';
import { axiosInstance } from './axios.helper';

export async function authenticateUser(
  endpoint: string,
  idToken: string,
  fcmToken: string,
): Promise<AuthenticateUserReturnValue> {
  const authenticationAttemptResult: AuthenticateUserReturnValue = {
    statusCode: 0,
    user: null,
  };

  await axiosInstance
    .post(`/auth/${endpoint}`, {
      idToken,
      fcmToken,
    })
    .then(response => {
      authenticationAttemptResult.user = response.data.user;
      authenticationAttemptResult.statusCode = response.status;
    })
    .catch(error => {
      console.log(error.message);
    });

  return authenticationAttemptResult;
}
