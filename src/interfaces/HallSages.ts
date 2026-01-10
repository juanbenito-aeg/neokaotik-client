import { AngeloTrialState } from '../constants/general';

interface HallSagesStore {
  showArtifactsAnimation: boolean;
  setShowArtifactsAnimation: SetShowArtifactsAnimation;
  angeloTrialState: AngeloTrialState;
  setAngeloTrialState: SetAngeloTrialState;
  showAngeloAnimation: boolean;
  setShowAngeloAnimation: SetShowAngeloAnimation;
  angeloTrialVotes: AngeloTrialVotes | null;
  setAngeloTrialVotes: SetAngeloTrialVotes;
}

type SetShowArtifactsAnimation = (showArtifactsAnimation: boolean) => void;

type SetAngeloTrialState = (angeloTrialState: AngeloTrialState) => void;

type SetShowAngeloAnimation = (showAngeloAnimation: boolean) => void;

interface AngeloTrialVotes {
  innocent: number;
  guilty: number;
}

type SetAngeloTrialVotes = (angeloTrialVotes: AngeloTrialVotes) => void;

export type {
  HallSagesStore,
  SetShowArtifactsAnimation,
  SetShowAngeloAnimation,
  SetAngeloTrialState,
};
