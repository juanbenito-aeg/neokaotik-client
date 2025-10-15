import KaotikaUser from './KaotikaUser';

interface UserContextInterface {
  user: KaotikaUser | null;
  setUser: SetUser;
}

type SetUser = (user: KaotikaUser | null) => void;

export type { UserContextInterface, SetUser };
