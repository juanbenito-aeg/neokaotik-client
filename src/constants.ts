enum ScreenBackgroundImgSrc {
  ACOLYTE_HOME = require('../public/images/roles/acolyte/home.png'),
  ACOLYTE_ANGELO_LAB = require('../public/images/main-background.png') /* TODO: Reference definitive background image */,
  ACOLYTE_SETTINGS = require('../public/images/main-background.png') /* TODO: Reference definitive background image */,
  ISTVAN_HOME = require('../public/images/roles/istvan/home.png'),
  SCAN_QR = require('../public/images/roles/istvan/scan-qr.png'),
  ISTVAN_SETTINGS = require('../public/images/main-background.png') /* TODO: Reference definitive background image */,
  MORTIMER_HOME = require('../public/images/roles/mortimer/home.png'),
  MORTIMER_ANGELO_LAB = require('../public/images/roles/mortimer/angelo-lab.png'),
  MORTIMER_SETTINGS = require('../public/images/main-background.png') /* TODO: Reference definitive background image */,
  VILLAIN_HOME = require('../public/images/roles/villain/home.png'),
  VILLAIN_SETTINGS = require('../public/images/main-background.png') /* TODO: Reference definitive background image */,
}

enum ButtonBackgroundImgSrc {
  CLOSE_CAMERA = require('../public/images/close-camera.png'),
  ACOLYTE_THEMED = require('../public/images/acolyte-themed-button.png'),
  ISTVAN_THEMED = require('../public/images/roles/istvan/button.png'),
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

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

export {
  ScreenBackgroundImgSrc,
  ButtonBackgroundImgSrc,
  UserRole,
  Tab,
  SocketGeneralEvents,
  SocketServerToClientEvents,
  SocketClientToServerEvents,
  PERSISTENCE_KEY,
};
