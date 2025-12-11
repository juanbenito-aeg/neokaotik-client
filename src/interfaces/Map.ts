import { StaticScreenProps } from '@react-navigation/native';
import { ViewStyle } from 'react-native';
import { ScreenChangingNotificationData } from './fcm';
import { MapNavigation } from '../constants/navigation';

type MapProps = StaticScreenProps<{
  screenChangingNotificationData?: ScreenChangingNotificationData;
  tabBarStyle: ViewStyle;
}>;

interface MapStore {
  mapNavigation: MapNavigation;
  setMapNavigation: SetMapNavigation;
  tabBarStyle: ViewStyle | null;
  setTabBarStyle: SetTabBarStyle;
}

type SetMapNavigation = (mapNavigation: MapNavigation) => void;

type SetTabBarStyle = (tabBarStyle: ViewStyle) => void;

export type { MapProps, MapStore };
