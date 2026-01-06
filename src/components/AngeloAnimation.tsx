import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import Text from './Text';
import { ButtonBackgroundImgSrc } from '../constants/image-sources';
import useMetrics from '../hooks/use-metrics';
import { useHallOfSageStore } from '../store/useHallOfSageStore';

const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const AnimatedContainer = Animatable.createAnimatableComponent(Container);

const AngeloAnimation = () => {
  const text =
    'With solemn silence, the acolytes lead Angelo forward. Chains clink as they march him before Mortimer. Fate has been sealed, and the dungeon awaits the fallen.';

  const words = text.split(' ');
  const [visibleWords, setVisibleWords] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const { ms } = useMetrics();

  const setShowAngeloAnimation = useHallOfSageStore(
    state => state.setShowAngeloAnimation,
  );

  useEffect(() => {
    const timeouts = words.map((word, index) =>
      setTimeout(() => {
        setVisibleWords(index + 1);
      }, index * 300),
    );

    const contentTimeout = setTimeout(() => {
      setShowContent(true);

      setTimeout(() => {
        setFadeOut(true);
      }, 2000);
    }, words.length * 300 + 500);

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      clearTimeout(contentTimeout);
    };
  }, []);

  return (
    <AnimatedContainer
      animation={fadeOut ? 'fadeOut' : undefined}
      duration={2500}
      style={{ justifyContent: 'center', alignItems: 'center' }}
      onAnimationEnd={() => fadeOut && setShowAngeloAnimation(false)}
    >
      <Text
        style={{
          fontSize: 36,
          color: 'white',
          lineHeight: 48,
          textAlign: 'center',
          marginHorizontal: 20,
        }}
      >
        {words.slice(0, visibleWords).join(' ')}
      </Text>

      {showContent && (
        <Animatable.Image
          source={ButtonBackgroundImgSrc.ANGELO_CAPTURED}
          resizeMode="contain"
          style={{
            width: ms(350, 1.5),
            height: ms(350, 1.5),
            marginTop: 30,
          }}
        />
      )}
    </AnimatedContainer>
  );
};

export default AngeloAnimation;
