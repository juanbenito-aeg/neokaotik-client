import KaotikaUser from './KaotikaUser';

interface PlayerStore {
  // User state & action
  user: KaotikaUser | null;
  setUser: SetUser;

  // Acolytes state & action
  acolytes: KaotikaUser[];
  setAcolytes: SetAcolytes;
}

type SetUser = (
  nextUser: KaotikaUser | null | ((currentUser: KaotikaUser) => KaotikaUser),
) => void;

type SetAcolytes = (
  nextAcolytes:
    | KaotikaUser[]
    | ((currentAcolytes: KaotikaUser[]) => KaotikaUser[]),
) => void;

export type { PlayerStore, SetUser, SetAcolytes };
