import KaotikaUser from './KaotikaUser';

interface AcolytesContextInterface {
  acolytes: KaotikaUser[];
  setAcolytes: (acolytes: KaotikaUser[]) => void;
}

export type { AcolytesContextInterface };
