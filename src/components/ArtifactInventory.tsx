import styled from 'styled-components/native';
import useMetrics from '../hooks/use-metrics';
import { HS, VS, MS } from '../interfaces/Metrics';
import useArtifactStore from '../store/useArtifactStore';
import { ArtifactImgSrc } from '../constants/image-sources';
import { GeneralBackgroundImgSrc } from '../constants/image-sources';
import Artifact from './Artifact';

const Container = styled.ImageBackground<{
  $hs: HS;
  $vs: VS;
  $ms: MS;
}>`
  position: absolute;
  bottom: 0%;
  width: ${({ $hs }) => $hs(330)}px;
  height: ${({ $vs }) => $vs(215)}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${({ $hs }) => $hs(10.5)}px;
  margin-bottom: ${({ $ms }) => $ms(65, 0.5)}px;
  filter: drop-shadow(0 0 10px #000000);
`;

const ArtifactInventory = () => {
  const { hs, vs, ms } = useMetrics();

  const artifacts = useArtifactStore(state => state.artifacts);

  return (
    <Container
      source={GeneralBackgroundImgSrc.ARTIFACT_INVENTORY}
      resizeMode="stretch"
      $hs={hs}
      $vs={vs}
      $ms={ms}
    >
      {artifacts.map((artifact, index) => (
        <Artifact
          key={index}
          _id={artifact._id}
          source={ArtifactImgSrc[artifact.name as keyof typeof ArtifactImgSrc]}
          state={artifact.state}
          testID={`artifact-${index}`}
        />
      ))}
    </Container>
  );
};

export default ArtifactInventory;
