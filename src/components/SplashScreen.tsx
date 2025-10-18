import styled from 'styled-components/native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const AnimatedImage = styled(Animated.Image)`
  width: 100%;
  height: 100%;
`;

const SplashScreen = () => {
  return (
    <AnimatedImage
      source={require('../../public/images/splash-screen.png')}
      entering={FadeIn}
      exiting={FadeOut}
    />
  );
};

export default SplashScreen;
