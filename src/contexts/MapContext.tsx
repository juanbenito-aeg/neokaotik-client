import { createContext } from 'react';
import { MapNavigationContextInterface } from '../interfaces/Map';
import { MapNavigation } from '../constants';
import { ViewStyle } from 'react-native';

const MapNavigationContext = createContext<MapNavigationContextInterface>({
  mapNavigation: MapNavigation.MAP,
  setMapNavigation: () => {},
});

const TabBarStyleContext = createContext<ViewStyle | null>(null);

export { MapNavigationContext, TabBarStyleContext };
