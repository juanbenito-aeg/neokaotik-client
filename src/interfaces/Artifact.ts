import { ArtifactState } from '../constants';

type ArtifactId = string;

interface Location {
  type: 'Point';
  coordinates: number[];
}

interface Artifact {
  _id: ArtifactId;
  name: string;
  source: string;
  state: ArtifactState;
  location: Location;
}

export type { ArtifactId, Artifact };
