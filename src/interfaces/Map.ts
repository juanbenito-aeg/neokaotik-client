import { StaticScreenProps } from '@react-navigation/native';
import { ViewStyle } from 'react-native';

type MapProps = StaticScreenProps<{ tabBarStyle: ViewStyle }>;

interface MapNavigationContextInterface {
  mapNavigation: number;
  setMapNavigation: SetMapNavigation;
}

type SetMapNavigation = (mapNavigation: number) => void;

export type { MapProps, MapNavigationContextInterface };
