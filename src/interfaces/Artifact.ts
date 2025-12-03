import { ArtifactImgSrc, ArtifactState } from '../constants';
import { Location } from './geolocalization';

interface ArtifactStore {
  artifacts: Artifact[];
  setArtifacts: SetArtifacts;
}

interface Artifact {
  _id: ArtifactId;
  name: string;
  state: ArtifactState;
  location: Location;
}

type ArtifactId = string;

type SetArtifacts = (
  nextArtifacts: Artifact[] | ((currentArtifacts: Artifact[]) => Artifact[]),
) => void;

interface ArtifactProps {
  _id: ArtifactId;
  source: ArtifactImgSrc;
  state: ArtifactState;
  testID: string;
}

export type {
  ArtifactStore,
  Artifact,
  ArtifactId,
  SetArtifacts,
  ArtifactProps,
};
