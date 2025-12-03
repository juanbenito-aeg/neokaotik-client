import { create } from 'zustand';
import { ArtifactStore } from '../interfaces/Artifact';

const useArtifactStore = create<ArtifactStore>()(set => ({
  artifacts: [],
  setArtifacts: nextArtifacts => {
    set(state => {
      return {
        artifacts:
          typeof nextArtifacts === 'function'
            ? nextArtifacts(state.artifacts)
            : nextArtifacts,
      };
    });
  },
}));

export default useArtifactStore;
