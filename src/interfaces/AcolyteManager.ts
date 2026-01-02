import { ViewStyle } from 'react-native';
import { VoidFunction } from './generics';
import KaotikaUser from './KaotikaUser';

interface AcolyteStateProps {
  acolyte: KaotikaUser;
}

interface ActionsProps {
  activeAcolyte: KaotikaUser | null;
}

interface Action {
  text: string;
  isDisabled: boolean;
  onPress: VoidFunction;
  style?: ViewStyle;
}

export type { AcolyteStateProps, ActionsProps, Action };
