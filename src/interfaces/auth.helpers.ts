import KaotikaUser from './KaotikaUser';

interface AuthenticateUserReturnValue {
  statusCode: number;
  user: KaotikaUser | null;
}

export type { AuthenticateUserReturnValue };
