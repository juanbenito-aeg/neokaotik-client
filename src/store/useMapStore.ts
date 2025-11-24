import { create } from 'zustand';
import { MapNavigation } from '../constants';
import { MapInterface } from '../interfaces/Map';

export const useMapStore = create<MapInterface>(set => ({
  mapNavigation: MapNavigation.MAP,
  setMapNavigation: (mapNavigation: MapNavigation) => set({ mapNavigation }),
}));
