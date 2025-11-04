import KaotikaUser from './KaotikaUser';

interface AcolytesListProps {
  headerText: string;
  fieldToFilterAcolytesBy: keyof KaotikaUser;
}

interface AcolytesListItemProps {
  avatar: string;
  nickname: string;
}

export type { AcolytesListProps, AcolytesListItemProps };
