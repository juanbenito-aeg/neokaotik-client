import { StaticScreenProps } from '@react-navigation/native';
import { DimensionValue, TextStyle, ViewStyle } from 'react-native';
import { ScreenChangingNotificationData } from './fcm';
import { MapNavigation } from '../constants/navigation';
import { ButtonProps } from './buttons';

type MapProps = StaticScreenProps<{
  screenChangingNotificationData?: ScreenChangingNotificationData;
  tabBarStyle: ViewStyle;
}>;

interface MapLocationProps extends ButtonProps {
  textStyle: TextStyle;
  position: MapLocationPosition;
  isDisabled?: boolean;
}

interface MapLocationPosition {
  top: DimensionValue;
  left?: DimensionValue;
}

interface MapStore {
  mapNavigation: MapNavigation;
  setMapNavigation: SetMapNavigation;
  tabBarStyle: ViewStyle | null;
  setTabBarStyle: SetTabBarStyle;
}

type SetMapNavigation = (mapNavigation: MapNavigation) => void;

type SetTabBarStyle = (tabBarStyle: ViewStyle) => void;

export type { MapProps, MapLocationProps, MapLocationPosition, MapStore };
