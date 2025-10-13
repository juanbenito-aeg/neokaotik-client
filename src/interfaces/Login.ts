import KaotikaUser from './KaotikaUser';

export interface LoginProps {
  setUser(user: KaotikaUser): void;
  setGeneralModalMessage(errorGeneralMessage: string): void;
}
