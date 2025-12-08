import styled from 'styled-components/native';
import { ArtifactProps } from '../interfaces/Artifact';
import usePlayerStore from '../store/usePlayerStore';
import { HS, MS, VS } from '../interfaces/Metrics';
import useMetrics from '../hooks/use-metrics';
import { ArtifactState } from '../constants';
import { GeneralBackgroundImgSrc } from '../constants/image-sources';

const ArtifactContainer = styled.ImageBackground<{ $hs: HS; $vs: VS; $ms: MS }>`
  width: ${({ $hs }) => $hs(55)}px;
  height: ${({ $vs }) => $vs(110)}px;
  justify-content: center;
  align-items: center;
  gap: ${({ $vs }) => $vs(8)}px;
`;

const ArtifactImage = styled.Image<{ $ms: MS }>`
  width: ${({ $ms }) => $ms(30, 0.75)}px;
  height: ${({ $ms }) => $ms(30, 0.75)}px;
`;

const CollectorAvatar = styled.Image<{ $ms: MS }>`
  width: ${({ $ms }) => $ms(30, 0.75)}px;
  height: ${({ $ms }) => $ms(30, 0.75)}px;
  border-radius: 9999px;
`;

const Artifact = ({ _id, source, state, testID }: ArtifactProps) => {
  const acolytes = usePlayerStore(state => state.acolytes);

  const collector = acolytes.find(acolyte =>
    acolyte.found_artifacts?.includes(_id),
  );

  const { hs, vs, ms } = useMetrics();

  return (
    <ArtifactContainer
      source={GeneralBackgroundImgSrc.ARTIFACT_SLOT}
      resizeMode="stretch"
      $hs={hs}
      $vs={vs}
      $ms={ms}
      testID={testID}
    >
      {state === ArtifactState.COLLECTED && (
        <>
          <ArtifactImage source={source} resizeMode="contain" $ms={ms} />

          <CollectorAvatar
            source={{ uri: collector?.avatar }}
            $ms={ms}
            resizeMode="contain"
          />
        </>
      )}
    </ArtifactContainer>
  );
};

export default Artifact;
