import { AngeloTrialState } from '../constants/general';

interface HallSagesStore {
  showArtifactsAnimation: boolean;
  setShowArtifactsAnimation: SetShowArtifactsAnimation;
  angeloTrialState: AngeloTrialState;
  setAngeloTrialState: SetAngeloTrialState;
}

type SetShowArtifactsAnimation = (showArtifactsAnimation: boolean) => void;

type SetAngeloTrialState = (angeloTrialState: AngeloTrialState) => void;

export type { HallSagesStore, SetShowArtifactsAnimation };
