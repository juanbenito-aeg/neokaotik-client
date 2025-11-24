import KaotikaUser from './KaotikaUser';

interface PlayerStore {
  // User state & action
  user: KaotikaUser | null;
  setUser: SetUser;
}

type SetUser = (
  nextUser: KaotikaUser | null | ((currentUser: KaotikaUser) => KaotikaUser),
) => void;

export type { PlayerStore, SetUser };
