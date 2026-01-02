import { ViewStyle } from 'react-native';
import { VoidFunction } from './generics';
import KaotikaUser from './KaotikaUser';
import { MortimerModeState } from '../constants/general';

interface AcolyteStateProps {
  acolyte: KaotikaUser;
  mortimerMode?: MortimerMode;
}

interface ActionsProps {
  activeAcolyte: KaotikaUser | null;
  mortimerMode?: MortimerMode;
  setMortimerMode?: (mode: MortimerMode) => void;
}

interface Action {
  text: string;
  isDisabled: boolean;
  onPress: VoidFunction;
  style?: ViewStyle;
}

type MortimerMode =
  | MortimerModeState.DEFAULT
  | MortimerModeState.DISEASE_SELECTION;

export type { AcolyteStateProps, ActionsProps, Action, MortimerMode };
