import {
  ButtonBackgroundImgSrc,
  MapNavigation,
  ScreenBackgroundImgSrc,
} from '../../constants';
import ScreenContainer from '../ScreenContainer';
import Button from '../Button';
import { useContext } from 'react';
import { MapNavigationContext } from '../../contexts/MapContext';
import type { MapNavigationContextInterface } from '../../interfaces/MapContext';
import { ViewStyle } from 'react-native';
import useMetrics from '../../hooks/use-metrics';

const OldSchoolMap = () => {
  const { ms } = useMetrics();
  const buttonFixedSize: number = 100;
  const scaleFactor: number = 1;
  const buttonCustomStyleObj: ViewStyle = {
    width: ms(buttonFixedSize, scaleFactor),
    height: ms(buttonFixedSize, scaleFactor),
    position: 'absolute',
    top: '1%',
    left: '5%',
  };

  const { setMapNavigation } =
    useContext<MapNavigationContextInterface>(MapNavigationContext);
  const handlerPress = () => {
    setMapNavigation(MapNavigation.MAP);
  };

  return (
    <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.OLD_SCHOOL_MAP}>
      <Button
        onPress={handlerPress}
        text=""
        customStyleObj={buttonCustomStyleObj}
        backgroundImgSrc={ButtonBackgroundImgSrc.GO_BACK}
      />
    </ScreenContainer>
  );
};

export default OldSchoolMap;
