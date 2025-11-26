import { create } from 'zustand';
import { IsLoadingStore } from '../interfaces/IsLoading';

export const useIsLoadingStore = create<IsLoadingStore>()(set => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
}));
