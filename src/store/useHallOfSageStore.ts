import { create } from 'zustand';
import { HallSagesStore } from '../interfaces/HallSages';

export const useHallOfSageStore = create<HallSagesStore>()(set => ({
  showArtifactsAnimation: false,
  setShowArtifactsAnimation: showArtifactsAnimation =>
    set(() => ({ showArtifactsAnimation })),
}));
