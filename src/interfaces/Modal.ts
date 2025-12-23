import { VoidFunction } from './generics';
import { ImageSourcePropType } from 'react-native';

interface ModalData {
  fullScreen?: boolean;
  content?: ModalContent;
  onPressActionButtonOne?: VoidFunction;
  actionButtonTextOne?: string;
  onPressActionButtonTwo?: VoidFunction;
  actionButtonTextTwo?: string;
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

interface ModalStore {
  modalData: ModalData | null;
  setModalData: SetModalData;
}

type SetModalData = (modalData: ModalData | null) => void;

export type { ModalData, SetModalData, ModalStore };
