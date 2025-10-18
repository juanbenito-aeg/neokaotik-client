import { ViewStyle } from 'react-native';
import { ButtonBackgroundImgSrc } from '../constants';

interface ButtonProps {
  customStyleObj?: ViewStyle;
  onPress: () => void;
  backgroundImgSrc: ButtonBackgroundImgSrc;
  text: string;
}

export type { ButtonProps };
