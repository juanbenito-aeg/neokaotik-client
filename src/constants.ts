import { Location } from './interfaces/geolocalization';
import { ModalData } from './interfaces/Modal';

enum UserRole {
  ACOLYTE = 'acolyte',
  ISTVAN = 'istvan',
  MORTIMER = 'mortimer',
  VILLAIN = 'villain',
}

enum DeviceState {
  BACKGROUND = 'background',
  QUIT = 'quit',
}

enum AsyncStorageKey {
  LAST_REMOTE_MSG_ID_AND_DEVICE_STATE = 'lastRemoteMessageIdAndDeviceState',
}

const DEFAULT_MODAL_DATA: ModalData = {
  fullScreen: false,
  content: {},
  actionButtonText: 'Dismiss',
};

enum NotificationTitle {
  SWAMP_TOWER = 'Swamp Tower',
  ACOLYTE_DISCOVERY = 'Acolyte Discovery',
  SUMMONED_HALL_SAGES = 'Summoned to The Hall of Sages',
}

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
  DeviceState,
  AsyncStorageKey,
  DEFAULT_MODAL_DATA,
  NotificationTitle,
  ArtifactState,
  NULL_LOCATION,
  Coordinate,
};
