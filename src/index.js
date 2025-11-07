/**
 * @format
 */

import { setBackgroundMessageHandler } from './helpers/fcm.helpers';
import { AppRegistry } from 'react-native';
import App from './components/App';
import { name as appName } from '../app.json';

globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

// Ensure messages (push notifications) arrive when the app is in the background or closed
setBackgroundMessageHandler();

AppRegistry.registerComponent(appName, () => App);
