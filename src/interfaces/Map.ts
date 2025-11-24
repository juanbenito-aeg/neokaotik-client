import { StaticScreenProps } from '@react-navigation/native';
import { ViewStyle } from 'react-native';
import { ScreenChangingNotificationData } from './fcm';
import { MapNavigation } from '../constants';

type MapProps = StaticScreenProps<{
  screenChangingNotificationData?: ScreenChangingNotificationData;
  tabBarStyle: ViewStyle;
}>;

interface MapStore {
  mapNavigation: MapNavigation;
  setMapNavigation: SetMapNavigation;
  tabBarStyle: ViewStyle | null;
  setTabBarStyle: setTabBarStyle;
}

type SetMapNavigation = (mapNavigation: MapNavigation) => void;
type setTabBarStyle = (tabBarStyle: ViewStyle) => void;

export type { MapProps, MapStore };
