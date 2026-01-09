import { AngeloTrialState } from '../constants/general';

interface HallSagesStore {
  showArtifactsAnimation: boolean;
  setShowArtifactsAnimation: SetShowArtifactsAnimation;
  angeloTrialState: AngeloTrialState;
  setAngeloTrialState: SetAngeloTrialState;
  showAngeloAnimation: boolean;
  setShowAngeloAnimation: SetShowAngeloAnimation;
}

type SetShowArtifactsAnimation = (showArtifactsAnimation: boolean) => void;

type SetAngeloTrialState = (angeloTrialState: AngeloTrialState) => void;

type SetShowAngeloAnimation = (showAngeloAnimation: boolean) => void;

export type {
  HallSagesStore,
  SetShowArtifactsAnimation,
  SetShowAngeloAnimation,
  SetAngeloTrialState,
};
