import { create } from 'zustand';
import { MapNavigation } from '../constants';
import { MapStore } from '../interfaces/Map';
import { ViewStyle } from 'react-native';

export const useMapStore = create<MapStore>()(set => ({
  mapNavigation: MapNavigation.MAP,
  setMapNavigation: (mapNavigation: MapNavigation) => set({ mapNavigation }),
  tabBarStyle: null,
  setTabBarStyle: (tabBarStyle: ViewStyle) => set({ tabBarStyle }),
}));
