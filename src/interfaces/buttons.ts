import { ViewStyle } from 'react-native';
import { ButtonBackgroundImgSrc } from '../constants/image-sources';
import { VoidFunction } from './generics';

interface ButtonProps {
  customStyleObj?: ViewStyle;
  onPress: VoidFunction;
  backgroundImgSrc: ButtonBackgroundImgSrc;
  text?: string;
  testID?: string;
}

interface GoBackButtonProps {
  onPress: VoidFunction;
}

export type { ButtonProps, GoBackButtonProps };
