import * as Animatable from 'react-native-animatable';
import {
  ButtonBackgroundImgSrc,
  ArtifactImgSrc,
} from '../constants/image-sources';
import { ArtifactRelatedImgSrc } from '../constants/image-sources';
import useArtifactStore from '../store/useArtifactStore';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import useMetrics from '../hooks/use-metrics';
import { useState } from 'react';
import Button from './Button';
import { MS } from '../interfaces/Metrics';
import { useHallOfSageStore } from '../store/useHallOfSageStore';
import emitArtifactsSearchValidationOrReset from '../socket/events/artifacts-search-validation-reset';

const ArtifactsContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const PanelImage = styled.Image<{ $ms: MS }>`
  position: absolute;
  top: ${({ $ms }) => $ms(255, 0.1)}px;
  width: 100%;
  height: ${({ $ms }) => $ms(200, 0.8)}px;
  resize-mode: cover;
  filter: drop-shadow(0 0 10px #000000);
`;

const Grid = styled.View<{ $ms: MS }>`
  position: absolute;
  top: ${({ $ms }) => $ms(305, 0.2)}px;
  width: 90%;
  height: ${({ $ms }) => $ms(200, 1)}px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 15%;
  width: 100%;
  align-items: center;
  gap: 40px;
`;

const ArtifactsPanel = () => {
  const { ms } = useMetrics();

  const artifacts = useArtifactStore(state => state.artifacts);
  const setShowArtifactsAnimation = useHallOfSageStore(
    state => state.setShowArtifactsAnimation,
  );

  const [isAnimationFinished, setAnimationFinished] = useState<boolean>(false);

  const handlePress = (isSearchValidated: boolean) => {
    setAnimationFinished(false);
    setShowArtifactsAnimation(false);
    emitArtifactsSearchValidationOrReset(isSearchValidated);
  };

  return (
    <ArtifactsContainer testID="artifacts-panel">
      <PanelImage source={ArtifactRelatedImgSrc.ARTIFACTS_PANEL} $ms={ms} />
      <Grid $ms={ms}>
        {artifacts.map((artifact, index) => {
          const delay = index * 300;
          const isLast = index === artifacts.length - 1;

          return (
            <Animatable.View
              key={index}
              animation="fadeInUpBig"
              duration={900}
              delay={delay}
              onAnimationEnd={() => isLast && setAnimationFinished(true)}
            >
              <Image
                testID={`artifacts-artifact_${index}`}
                source={
                  ArtifactImgSrc[artifact.name as keyof typeof ArtifactImgSrc]
                }
                style={{
                  width: ms(60, 0.9),
                  height: ms(70, 0.9),
                  resizeMode: 'contain',
                  margin: ms(8, 0.5),
                }}
              />
            </Animatable.View>
          );
        })}
      </Grid>

      {isAnimationFinished && (
        <ButtonContainer testID="button-container">
          <Animatable.View animation="fadeInUp" duration={900}>
            <Button
              backgroundImgSrc={ButtonBackgroundImgSrc.DEFAULT_THEMED}
              onPress={() => {
                handlePress(true);
              }}
              text="Validate search"
            />

            <Button
              backgroundImgSrc={ButtonBackgroundImgSrc.DEFAULT_THEMED}
              onPress={() => {
                handlePress(false);
              }}
              text="Reset search"
            />
          </Animatable.View>
        </ButtonContainer>
      )}
    </ArtifactsContainer>
  );
};

export default ArtifactsPanel;
