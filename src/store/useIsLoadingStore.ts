import { create } from 'zustand';
import { IsLoadingStore } from '../interfaces/IsLoadingContext';

export const useIsLoadingStore = create<IsLoadingStore>()(set => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
