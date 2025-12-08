import { create } from 'zustand';
import { MapNavigation } from '../constants/navigation';
import { MapStore } from '../interfaces/Map';

export const useMapStore = create<MapStore>()(set => ({
  mapNavigation: MapNavigation.MAP,
  setMapNavigation: mapNavigation => set(() => ({ mapNavigation })),
  tabBarStyle: null,
  setTabBarStyle: tabBarStyle => set(() => ({ tabBarStyle })),
}));
