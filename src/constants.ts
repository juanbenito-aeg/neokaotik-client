import { Location } from './interfaces/geolocalization';
import { ModalData } from './interfaces/Modal';

enum UserRole {
  ACOLYTE = 'acolyte',
  ISTVAN = 'istvan',
  MORTIMER = 'mortimer',
  VILLAIN = 'villain',
}

enum AsyncStorageKey {
  LAST_REMOTE_MSG_ID_AND_DEVICE_STATE = 'lastRemoteMessageIdAndDeviceState',
}

const DEFAULT_MODAL_DATA: ModalData = {
  fullScreen: false,
  content: {},
  actionButtonText: 'Dismiss',
};

enum ArtifactState {
  ACTIVE = 'active',
  COLLECTED = 'collected',
}

const NULL_LOCATION: Location = {
  type: 'Point',
  coordinates: [0, 0],
};

enum Coordinate {
  LONGITUDE,
  LATITUDE,
}

export {
  UserRole,
  AsyncStorageKey,
  DEFAULT_MODAL_DATA,
  ArtifactState,
  NULL_LOCATION,
  Coordinate,
};
