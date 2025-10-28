import { ViewStyle } from 'react-native';
import { ButtonBackgroundImgSrc } from '../constants';
import { VoidFunction } from './generics';

interface ButtonProps {
  customStyleObj?: ViewStyle;
  onPress: VoidFunction;
  backgroundImgSrc: ButtonBackgroundImgSrc;
  text: string;
}

interface GoBackButtonProps {
  onPress: VoidFunction;
}

export type { ButtonProps, GoBackButtonProps };
