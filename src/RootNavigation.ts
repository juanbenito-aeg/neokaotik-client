import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { Tab } from './constants';

const navigationRef = createNavigationContainerRef<{}>();

function navigate(name: Tab, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(name, params));
  }
}

export { navigationRef, navigate };
