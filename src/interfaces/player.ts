import KaotikaUser from './KaotikaUser';

interface PlayerStore {
  // User state & action
  user: KaotikaUser | null;
  setUser: SetUser;

  // Acolytes state & action
  acolytes: KaotikaUser[];
  setAcolytes: SetAcolytes;

  // Non-acolytes state & action
  nonAcolytes: KaotikaUser[];
  setNonAcolytes: SetNonAcolytes;
}

type SetUser = (
  nextUser: KaotikaUser | null | ((currentUser: KaotikaUser) => KaotikaUser),
) => void;

type SetAcolytes = (
  nextAcolytes:
    | KaotikaUser[]
    | ((currentAcolytes: KaotikaUser[]) => KaotikaUser[]),
) => void;

type SetNonAcolytes = (
  nextNonAcolytes:
    | KaotikaUser[]
    | ((currentNonAcolytes: KaotikaUser[]) => KaotikaUser[]),
) => void;

export type { PlayerStore, SetUser, SetAcolytes, SetNonAcolytes };
