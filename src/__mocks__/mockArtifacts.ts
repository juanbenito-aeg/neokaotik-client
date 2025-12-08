import { Artifact } from '../interfaces/Artifact';
import { ArtifactState } from '../constants/general';

const mockArtifacts: Artifact[] = [
  {
    _id: 'artifact_1',
    name: 'The Auracle Sphere',
    state: ArtifactState.COLLECTED,
    location: { type: 'Point', coordinates: [-2.002441, 43.310673] },
  },
  {
    _id: 'artifact_2',
    name: 'The Chalice of Dawnbound Kings',
    state: ArtifactState.COLLECTED,
    location: { type: 'Point', coordinates: [-2.003381, 43.309801] },
  },
  {
    _id: 'artifact_3',
    name: "The Compass of Asterion's Path",
    state: ArtifactState.COLLECTED,
    location: { type: 'Point', coordinates: [-2.003209, 43.310625] },
  },
  {
    _id: 'artifact_4',
    name: 'The Stoneheart Sigil',
    state: ArtifactState.ACTIVE,
    location: { type: 'Point', coordinates: [-2.00203, 43.309534] },
  },
];

export default mockArtifacts;
