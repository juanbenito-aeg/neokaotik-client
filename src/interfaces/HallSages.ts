interface HallSagesStore {
  showArtifactsAnimation: boolean;
  setShowArtifactsAnimation: SetShowArtifactsAnimation;
}

type SetShowArtifactsAnimation = (showArtifactsAnimation: boolean) => void;

export type { HallSagesStore, SetShowArtifactsAnimation };
