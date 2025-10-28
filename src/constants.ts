enum ScreenBackgroundImgSrc {
  ACOLYTE_HOME = require('../public/images/roles/acolyte/home.png'),
  ACOLYTE_ANGELO_LAB_ENTRANCE = require('../public/images/roles/acolyte/angelo-lab-entrance.png'),
  ACOLYTE_ANGELO_LAB = require('../public/images/roles/acolyte/angelo-lab.png'),
  ACOLYTE_SETTINGS = require('../public/images/roles/acolyte/settings.png'),
  ISTVAN_HOME = require('../public/images/roles/istvan/home.png'),
  SCAN_QR = require('../public/images/roles/istvan/scan-qr.png'),
  ISTVAN_SETTINGS = require('../public/images/roles/istvan/settings.png'),
  MORTIMER_HOME = require('../public/images/roles/mortimer/home.png'),
  MORTIMER_ANGELO_LAB = require('../public/images/roles/mortimer/angelo-lab.png'),
  MORTIMER_SETTINGS = require('../public/images/roles/mortimer/settings.png'),
  VILLAIN_HOME = require('../public/images/roles/villain/home.png'),
  VILLAIN_SETTINGS = require('../public/images/roles/villain/settings.png'),
  MAP = require('../public/images/map.png'),
  OLD_SCHOOL_MAP = require('../public/images/old-school-map.png'),
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
}

enum UserRole {
  ACOLYTE = 'acolyte',
  ISTVAN = 'istvan',
  MORTIMER = 'mortimer',
  VILLAIN = 'villain',
}

enum Tab {
  HOME = 'Home',
  ANGELO_LAB = 'AngeloLab',
  SCAN_QR = 'ScanQr',
  SETTINGS = 'Settings',
  MAP = 'Map',
}

enum SocketGeneralEvents {
  CONNECT = 'connect',
}

enum SocketServerToClientEvents {
  ACOLYTE_INSIDE_OUTSIDE_LAB = 'acolyte inside/outside lab',
  ACOLYTE_DISCONNECTED = 'acolyte disconnected',
}

enum SocketClientToServerEvents {
  CONNECTION_OPEN = 'connection open',
  ACCESS_TO_EXIT_FROM_LAB = 'access to/exit from lab',
}

enum MapNavigation {
  MAP,
  OLD_SCHOOL_MAP,
}

enum OldSchoolLocation {
  MAP,
  ANGELO_LAB,
}

export {
  ScreenBackgroundImgSrc,
  ButtonBackgroundImgSrc,
  UserRole,
  Tab,
  SocketGeneralEvents,
  SocketServerToClientEvents,
  SocketClientToServerEvents,
  MapNavigation,
  OldSchoolLocation,
};
