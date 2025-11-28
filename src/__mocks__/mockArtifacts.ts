import { Artifact } from '../interfaces/Artifact';
import { ArtifactState } from '../constants';

const mockArtifacts: Artifact[] = [
  {
    _id: 'artifact_1',
    name: 'The Auracle Sphere',
    source:
      'https://neokaotik.s3.eu-north-1.amazonaws.com/images/artifacts/orb.png',
    state: ArtifactState.ACTIVE,
    location: { type: 'Point', coordinates: [-2.002441, 43.310673] },
  },
  {
    _id: 'artifact_2',
    name: 'The Chalice of Dawnbound Kings',
    source:
      'https://neokaotik.s3.eu-north-1.amazonaws.com/images/artifacts/chalice.png',
    state: ArtifactState.COLLECTED,
    location: { type: 'Point', coordinates: [-2.003381, 43.309801] },
  },
];

export default mockArtifacts;
