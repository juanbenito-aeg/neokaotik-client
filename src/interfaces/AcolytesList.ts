import { VoidFunction } from './generics';
import { ScreenBackgroundImgSrc } from '../constants';
import KaotikaUser from './KaotikaUser';

interface AcolytesListProps {
  onPressGoBackButton: VoidFunction;
  backgroundImgSrc: ScreenBackgroundImgSrc;
  headerText: string;
  fieldToFilterAcolytesBy: keyof KaotikaUser;
}

interface AcolytesListItemProps {
  avatar: string;
  nickname: string;
}

export type { AcolytesListProps, AcolytesListItemProps };
