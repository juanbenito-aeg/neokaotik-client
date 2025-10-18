import styled from 'styled-components/native';
import type { ButtonProps } from '../interfaces/Button';
import { useState } from 'react';
import Animated, { CSSTransitionProperties } from 'react-native-reanimated';
import { Pressable, ViewStyle } from 'react-native';
import Text from './Text';
import useMetrics from '../hooks/use-metrics';

const ButtonBackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0 0 10px #000000);
`;

const ButtonText = styled(Text)`
  text-align: center;
  text-shadow: 0 0 2.5px rgb(0 0 0);
`;

const Button = ({
  customStyleObj,
  onPress,
  backgroundImgSrc,
  text,
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const { ms } = useMetrics();

  const defaultStyleObj: ViewStyle & Partial<CSSTransitionProperties> = {
    width: ms(235, 0.75),
    height: ms(98, 0.75),
    alignSelf: 'center',
    opacity: isPressed ? 0.75 : 1,
    transitionProperty: 'opacity',
    transitionDuration: 175,
  };

  function handlePressIn() {
    setIsPressed(true);
  }

  function handlePressOut() {
    setIsPressed(false);
  }

  return (
    <Animated.View style={[defaultStyleObj, customStyleObj]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        <ButtonBackgroundImage
          source={backgroundImgSrc}
          imageStyle={{ resizeMode: 'contain' }}
        >
          <ButtonText>{text}</ButtonText>
        </ButtonBackgroundImage>
      </Pressable>
    </Animated.View>
  );
};

export default Button;
