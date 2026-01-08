import { ScreenBackgroundImgSrc } from '../../../constants/image-sources';
import ScreenContainer from '../../ScreenContainer';
import Animated from 'react-native-reanimated';
import Text from '../../Text';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { MS } from '../../../interfaces/Metrics';
import useMetrics from '../../../hooks/use-metrics';
import { TextAnimationState } from '../../../constants/angelo-subdued';
import { navigate } from '../../../RootNavigation';
import { MapNavigation, Tab } from '../../../constants/navigation';

const AnimatedText = Animated.createAnimatedComponent(Text);

const StyledText = styled(AnimatedText)<{ $ms: MS }>`
  color: rgb(253, 255, 252);
`;

const textPieces = [
  'Angelo is brought to his knees,',
  'his struggle extinguished in moments.',
  'Guarded day and night,',
  'he is driven across wide and hostile lands—',
  'along ancient roads, past forgotten borders,',
  'through wind-scoured wastes.',
  'With every mile, his freedom slips further away,',
  "until the looming silhouette of 'The Old School'",
  'stands before him, inevitable and absolute.',
];

const AngeloSubdued = () => {
  const [textAnimationState, setTextAnimationState] =
    useState<TextAnimationState>(TextAnimationState.INACTIVE);

  const { ms } = useMetrics();

  useEffect(() => {
    setTimeout(() => {
      setTextAnimationState(TextAnimationState.ACTIVE);

      const TEXT_ANIMATION_DURATION = 1000 * (textPieces.length - 1);

      setTimeout(() => {
        setTextAnimationState(TextAnimationState.FINISHED);

        setTimeout(() => {
          navigate(Tab.MAP, {
            screenChangingNotificationData: {
              destination: MapNavigation.OLD_SCHOOL_MAP,
            },
          });
        }, 5000);
      }, TEXT_ANIMATION_DURATION + 7500);
    }, 1000);
  }, []);

  const screenContainerBackgroundImgSrc =
    textAnimationState === TextAnimationState.FINISHED
      ? ScreenBackgroundImgSrc.ANGELO_SUBDUED
      : undefined;

  return (
    <ScreenContainer backgroundImgSrc={screenContainerBackgroundImgSrc}>
      {textAnimationState !== TextAnimationState.FINISHED &&
        textPieces.map((textPiece, index) => (
          <StyledText
            key={textPiece}
            style={{
              transform: [
                {
                  scaleX:
                    textAnimationState === TextAnimationState.ACTIVE ? 1 : 0,
                },
              ],
              transitionProperty: 'transform',
              transitionDuration: 1000,
              transitionDelay: 1000 * index,
            }}
            $ms={ms}
          >
            {textPiece}
          </StyledText>
        ))}
    </ScreenContainer>
  );
};

export { AngeloSubdued };
