import { ArtifactState } from '../constants';
import { Location } from './geolocalization';

interface Artifact {
  _id: ArtifactId;
  name: string;
  source: string;
  state: ArtifactState;
  location: Location;
}

type ArtifactId = string;

export type { Artifact, ArtifactId };
