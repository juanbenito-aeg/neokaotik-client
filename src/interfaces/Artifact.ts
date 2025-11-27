import { ArtifactState } from '../constants';
import { Location } from './geolocalization';

interface ArtifactStore {
  artifacts: Artifact[];
  setArtifacts: SetArtifacts;
}

interface Artifact {
  _id: ArtifactId;
  name: string;
  source: string;
  state: ArtifactState;
  location: Location;
}

type ArtifactId = string;

type SetArtifacts = (artifacts: Artifact[]) => void;

interface ArtifactProps {
  _id: ArtifactId;
  source: string;
  state: ArtifactState;
}

export type { ArtifactStore, Artifact, ArtifactId, ArtifactProps };
