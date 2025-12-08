import { NestedScreenProps } from '../interfaces/generics';
import ScreenContainer from './ScreenContainer';
import {
  ScreenBackgroundImgSrc,
  ButtonBackgroundImgSrc,
  ArtifactImgSrc,
  ArtifactRelatedImgSrc,
} from '../constants/image-sources';
import Header from './Header';
import GoBackButton from './GoBackButton';
import Button from './Button';
import useArtifactStore from '../store/useArtifactStore';
import styled from 'styled-components/native';
import { ImageStyle, ViewStyle } from 'react-native';
import useMetrics from '../hooks/use-metrics';

const ArtifactsFrame = styled.ImageBackground<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  filter: drop-shadow(0 0 10px #000000);
`;

const Artifact = styled.Image<{ $size: number }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  filter: drop-shadow(0 0 5px #000000);
`;

const Obituary = ({ onPressGoBackButton }: NestedScreenProps) => {
  const { ms } = useMetrics();

  const artifacts = useArtifactStore(state => state.artifacts);

  const artifactsPositions: ImageStyle[] = [
    {
      top: '5%',
      left: '7.5%',
    },
    {
      top: '5%',
      left: '76.5%',
    },
    {
      top: '78%',
      left: '6.75%',
    },
    {
      top: '78%',
      left: '76.5%',
    },
  ];

  const buttonCustomStyleObj: ViewStyle = {
    margin: 'auto',
  };

  return (
    <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.OBITUARY}>
      <Header>The Obituary (Entrance)</Header>

      <GoBackButton onPress={onPressGoBackButton} />

      <ArtifactsFrame
        source={ArtifactRelatedImgSrc.ARTIFACTS_FRAME}
        $size={ms(350, 1)}
      >
        {artifacts.map((artifact, index) => (
          <Artifact
            key={artifact._id}
            source={
              ArtifactImgSrc[artifact.name as keyof typeof ArtifactImgSrc]
            }
            resizeMode="contain"
            style={artifactsPositions[index]}
            $size={ms(60, 1)}
          />
        ))}

        <Button
          customStyleObj={buttonCustomStyleObj}
          onPress={() => {}}
          backgroundImgSrc={ButtonBackgroundImgSrc.DEFAULT_THEMED}
          text="Enter The Obituary"
        />
      </ArtifactsFrame>
    </ScreenContainer>
  );
};

export default Obituary;
