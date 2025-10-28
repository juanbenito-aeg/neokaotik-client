import { ViewStyle } from 'react-native';
import useMetrics from '../hooks/use-metrics';
import Button from './Button';
import { ButtonBackgroundImgSrc } from '../constants';
import { GoBackButtonProps } from '../interfaces/buttons';

const GoBackButton = ({ onPress }: GoBackButtonProps) => {
  const { ms } = useMetrics();
  const buttonFixedSize: number = 100;
  const scaleFactor: number = 1;
  const buttonCustomStyleObj: ViewStyle = {
    width: ms(buttonFixedSize, scaleFactor),
    height: ms(buttonFixedSize, scaleFactor),
    position: 'absolute',
    top: '-2.5%',
    left: '5%',
  };

  return (
    <Button
      customStyleObj={buttonCustomStyleObj}
      onPress={onPress}
      backgroundImgSrc={ButtonBackgroundImgSrc.GO_BACK}
      text=""
    />
  );
};

export default GoBackButton;
