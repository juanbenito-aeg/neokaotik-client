import KaotikaUser from './KaotikaUser';

interface AcolytesContextInterface {
  acolytes: KaotikaUser[];
  setAcolytes: SetAcolytes;
}

type SetAcolytes = (acolytes: KaotikaUser[]) => void;

export type { AcolytesContextInterface, SetAcolytes };
