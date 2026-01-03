import { create } from 'zustand';
import { HallSagesStore } from '../interfaces/HallSages';
import { AngeloTrialState } from '../constants/general';

export const useHallOfSageStore = create<HallSagesStore>()(set => ({
  showArtifactsAnimation: false,
  setShowArtifactsAnimation: showArtifactsAnimation =>
    set(() => ({ showArtifactsAnimation })),

  angeloTrialState: AngeloTrialState.INACTIVE,
  setAngeloTrialState: angeloTrialState => set(() => ({ angeloTrialState })),
}));
