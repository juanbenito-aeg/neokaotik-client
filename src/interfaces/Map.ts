import { StaticScreenProps } from '@react-navigation/native';
import { ViewStyle } from 'react-native';
import { ScreenChangingNotificationData } from './fcm';
import { MapNavigation } from '../constants';

type MapProps = StaticScreenProps<{
  screenChangingNotificationData?: ScreenChangingNotificationData;
  tabBarStyle: ViewStyle;
}>;

interface MapNavigationContextInterface {
  mapNavigation: MapNavigation;
  setMapNavigation: SetMapNavigation;
}

type SetMapNavigation = (mapNavigation: MapNavigation) => void;

export type { MapProps, MapNavigationContextInterface };
