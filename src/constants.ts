import { Location } from './interfaces/geolocalization';
import { ModalData } from './interfaces/Modal';

enum GeneralBackgroundImgSrc {
  ARTIFACT_INVENTORY = require('../public/images/artifact-inventory.png'),
  ARTIFACT_SLOT = require('../public/images/artifact-slot.png'),
}

enum ScreenBackgroundImgSrc {
  ACOLYTE_HOME = require('../public/images/roles/acolyte/home.png'),
  ACOLYTE_SWAMP_TOWER_ENTRANCE = require('../public/images/roles/acolyte/swamp-tower-entrance.png'),
  ACOLYTE_SWAMP_TOWER_INTERIOR = require('../public/images/roles/acolyte/swamp-tower-interior.png'),
  ACOLYTE_ANGELO_LAB_ENTRANCE = require('../public/images/roles/acolyte/angelo-lab-entrance.png'),
  ACOLYTE_ANGELO_LAB = require('../public/images/roles/acolyte/angelo-lab.png'),
  ACOLYTE_SETTINGS = require('../public/images/roles/acolyte/settings.png'),
  ISTVAN_HOME = require('../public/images/roles/istvan/home.png'),
  SCAN_QR = require('../public/images/roles/istvan/scan-qr.png'),
  ISTVAN_SETTINGS = require('../public/images/roles/istvan/settings.png'),
  MORTIMER_HOME = require('../public/images/roles/mortimer/home.png'),
  MORTIMER_SWAMP_TOWER = require('../public/images/roles/mortimer/swamp-tower.png'),
  MORTIMER_ANGELO_LAB = require('../public/images/roles/mortimer/angelo-lab.png'),
  MORTIMER_SETTINGS = require('../public/images/roles/mortimer/settings.png'),
  VILLAIN_HOME = require('../public/images/roles/villain/home.png'),
  VILLAIN_SETTINGS = require('../public/images/roles/villain/settings.png'),
  MAP = require('../public/images/map.png'),
  OLD_SCHOOL_MAP = require('../public/images/old-school-map.png'),
  HALL_OF_SAGES = require('../public/images/hall-of-sages.png'),
  SWAMP = require('../public/images/swamp.png'),
}

enum ButtonBackgroundImgSrc {
  CLOSE_CAMERA = require('../public/images/close-camera.png'),
  DEFAULT_THEMED = require('../public/images/themed-button.png'),
  ISTVAN_THEMED = require('../public/images/roles/istvan/button.png'),
  MORTIMER_THEMED = require('../public/images/roles/mortimer/button.png'),
  VILLAIN_THEMED = require('../public/images/roles/villain/button.png'),
  OLD_SCHOOL = require('../public/images/old-school-icon.png'),
  GO_BACK = require('../public/images/go-back.png'),
  ANGELO_LAB = require('../public/images/angelo-lab-icon.png'),
  SWAMP = require('../public/images/swamp-icon.png'),
  SWAMP_TOWER = require('../public/images/swamp-tower-icon.png'),
  SCROLL = require('../public/images/roles/acolyte/scroll.png'),
  HALL_OF_SAGES = require('../public/images/the-hall-of-sages-icon.png'),
}

enum ModalBackgroundImgSrc {
  FULL_SCREEN = require('../public/images/full-screen-modal.png'),
  NORMAL = require('../public/images/normal-modal.png'),
}

enum ModalImgSrc {
  BAG_OF_ARTIFACTS = require('../public/images/bag-of-artifacts.png'),
}

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
}

enum SocketClientToServerEvents {
  CONNECTION_OPEN = 'connection open',
  ACCESS_TO_EXIT_FROM_LAB = 'access to/exit from lab',
  INSIDE_OUTSIDE_TOWER_ENTRANCE = 'acolyte inside/outside tower',
  SCROLL_PRESS = 'scroll press',
  REMOVE_SPELL_PRESS = 'remove spell press',
  ENTERED_EXITED_HS = 'player entered/exited HS',
  ACOLYTE_MOVED = 'acolyte moved',
}

enum MapNavigation {
  MAP = 'Map',
  OLD_SCHOOL_MAP = 'Old School Map',
  SWAMP = 'Swamp',
  SWAMP_TOWER = 'Swamp Tower',
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
  GeneralBackgroundImgSrc,
  ScreenBackgroundImgSrc,
  ButtonBackgroundImgSrc,
  ModalBackgroundImgSrc,
  ModalImgSrc,
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
