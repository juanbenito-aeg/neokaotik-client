import { Location } from './interfaces/geolocalization';
import { ModalData } from './interfaces/Modal';

enum UserRole {
  ACOLYTE = 'acolyte',
  ISTVAN = 'istvan',
  MORTIMER = 'mortimer',
  VILLAIN = 'villain',
}

enum Tab {
  HOME = 'Home',
  MAP = 'Map',
  SETTINGS = 'Settings',
}

enum SocketGeneralEvents {
  CONNECT = 'connect',
}

enum SocketServerToClientEvents {
  ACOLYTE_INSIDE_OUTSIDE_LAB = 'acolyte inside/outside lab',
  ACOLYTE_DISCONNECTED = 'acolyte disconnected',
  ACOLYTE_TOWER_ACCESS = 'acolyte tower access',
  ACOLYTE_POSITION_CHANGED = "acolyte's position changed",
  ARTIFACT_COLLECTED = 'artifact collected',
  ENTERED_EXITED_HS = 'player entered/exited HS',
  ARTIFACTS_SEARCH_VALIDATION_RESET_MANAGED = 'artifacts search validation/reset managed',
  REQUESTED_TO_SHOW_ARTIFACTS = 'requested to show artifacts',
}

enum SocketClientToServerEvents {
  CONNECTION_OPEN = 'connection open',
  ACCESS_TO_EXIT_FROM_LAB = 'access to/exit from lab',
  INSIDE_OUTSIDE_TOWER_ENTRANCE = 'acolyte inside/outside tower',
  SCROLL_PRESS = 'scroll press',
  REMOVE_SPELL_PRESS = 'remove spell press',
  ENTERED_EXITED_HS = 'player entered/exited HS',
  ACOLYTE_MOVED = 'acolyte moved',
  ARTIFACT_PRESSED = 'artifact pressed',
  REQUESTED_TO_SHOW_ARTIFACTS = 'requested to show artifacts',
  ARTIFACTS_SEARCH_VALIDATION_RESET = 'artifacts search validated/reset',
}

enum MapNavigation {
  MAP = 'Map',
  OLD_SCHOOL_MAP = 'Old School Map',
  SWAMP = 'Swamp',
  SWAMP_TOWER = 'Swamp Tower',
  OBITUARY = 'The Obituary',
}

enum OldSchoolLocation {
  MAP = 'Map',
  ANGELO_LAB = 'Angelo Lab',
  HALL_OF_SAGES = 'The Hall of Sages',
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
  Tab,
  SocketGeneralEvents,
  SocketServerToClientEvents,
  SocketClientToServerEvents,
  MapNavigation,
  OldSchoolLocation,
  DeviceState,
  AsyncStorageKey,
  DEFAULT_MODAL_DATA,
  NotificationTitle,
  ArtifactState,
  NULL_LOCATION,
  Coordinate,
};
