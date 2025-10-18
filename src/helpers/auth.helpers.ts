import type { AuthenticateUserReturnValue } from '../interfaces/auth.helpers';

export async function authenticateUser(
  endpoint: string,
  idToken: string,
): Promise<AuthenticateUserReturnValue> {
  const response = await fetch(`http://10.50.0.50:6000/user/${endpoint}`, {
    method: 'POST',
    body: JSON.stringify({ idToken }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

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
