import { createContext } from 'react';
import { MapNavigationContextInterface } from '../interfaces/MapContext';
import { MapNavigation } from '../constants';

export const MapNavigationContext =
  createContext<MapNavigationContextInterface>({
    mapNavigation: MapNavigation.MAP,
    setMapNavigation: () => {},
  });
