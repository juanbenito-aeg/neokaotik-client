import { ModalData } from '../interfaces/Modal';

enum UserRole {
  ACOLYTE = 'acolyte',
  ISTVAN = 'istvan',
  MORTIMER = 'mortimer',
  VILLAIN = 'villain',
  ANGELO = 'angelo',
}

const DEFAULT_MODAL_DATA: ModalData = {
  fullScreen: false,
  content: {},
  actionButtonTextOne: 'Dismiss',
};

enum AsyncStorageKey {
  LAST_REMOTE_MSG_ID_AND_DEVICE_STATE = 'lastRemoteMessageIdAndDeviceState',
}

enum ArtifactState {
  ACTIVE = 'active',
  COLLECTED = 'collected',
}

enum MortimerModeState {
  DEFAULT = 'default',
  DISEASE_SELECTION = 'disease selection',
}

export {
  UserRole,
  DEFAULT_MODAL_DATA,
  AsyncStorageKey,
  ArtifactState,
  MortimerModeState,
};
