import { View, ViewStyle } from 'react-native';
import useMetrics from '../hooks/use-metrics';
import { MapLocationProps } from '../interfaces/Map';
import Button from './Button';
import Text from './Text';

const MapLocation = ({
  text,
  textStyle,
  position,
  isDisabled,
  onPress,
  backgroundImgSrc,
  testID,
}: MapLocationProps) => {
  const { ms } = useMetrics();

  const buttonFixedSize = 70;
  const buttonScaleFactor = 1;

  const buttonCustomStyleObj: ViewStyle = {
    width: ms(buttonFixedSize, buttonScaleFactor),
    height: ms(buttonFixedSize, buttonScaleFactor),
    [isDisabled ? 'opacity' : 'borderRadius']: 1,
  };

  return (
    <View
      style={{
        position: 'absolute',
        ...position,
        [isDisabled ? 'opacity' : 'borderRadius']: 0.5,
      }}
    >
      <Button
        customStyleObj={buttonCustomStyleObj}
        onPress={() => {
          !isDisabled && onPress();
        }}
        backgroundImgSrc={backgroundImgSrc}
        testID={testID}
      />

      <Text
        style={{
          ...textStyle,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export { MapLocation };
