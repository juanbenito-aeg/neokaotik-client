import { create } from 'zustand';
import { ArtifactStore } from '../interfaces/Artifact';

const useArtifactStore = create<ArtifactStore>()(set => ({
  artifacts: [],
  setArtifacts: artifacts => set(() => ({ artifacts })),
}));

export default useArtifactStore;
