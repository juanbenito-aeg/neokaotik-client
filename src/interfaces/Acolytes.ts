import KaotikaUser from './KaotikaUser';

interface AcolytesContextInterface {
  acolytes: KaotikaUser[];
  setAcolytes: SetAcolytes;
}

type SetAcolytes = React.Dispatch<React.SetStateAction<KaotikaUser[]>>;

export type { AcolytesContextInterface, SetAcolytes };
