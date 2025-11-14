import { VoidFunction } from './generics';
import { ImageSourcePropType } from 'react-native';

interface ModalData {
  fullScreen?: boolean;
  content?: ModalContent;
  onPressActionButton?: VoidFunction;
  actionButtonText?: string;
}

interface ModalContent {
  message?: string;
  image?: ModalImage;
}

interface ModalImage {
  source: ImageSourcePropType;
  width: number;
  height: number;
}

type SetModalData = React.Dispatch<React.SetStateAction<ModalData | null>>;

export type { ModalData, SetModalData };
