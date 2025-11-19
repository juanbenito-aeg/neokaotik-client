import KaotikaUser from './KaotikaUser';

interface UserContextInterface {
  user: KaotikaUser | null;
  setUser: SetUser;
}

type SetUser = React.Dispatch<React.SetStateAction<KaotikaUser | null>>;

export type { UserContextInterface, SetUser };
