import type { AuthenticateUserReturnValue } from '../interfaces/auth.helpers';

export async function authenticateUser(
  endpoint: string,
  idToken: string,
  fcmToken: string,
): Promise<AuthenticateUserReturnValue> {
  const response = await fetch(
    `https://neokaotik-server.onrender.com/user/${endpoint}`,
    {
      method: 'POST',
      body: JSON.stringify({ idToken, fcmToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const authenticationAttemptResult: AuthenticateUserReturnValue = {
    statusCode: response.status,
    user: null,
  };

  if (response.ok) {
    const { user } = await response.json();
    authenticationAttemptResult.user = user;
  }

  return authenticationAttemptResult;
}
