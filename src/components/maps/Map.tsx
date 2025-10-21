import {
  MapNavigation,
  ScreenBackgroundImgSrc,
  ButtonBackgroundImgSrc,
} from '../../constants';
import ScreenContainer from '../ScreenContainer';
import Button from '../Button';
import OldSchoolMap from './OldSchoolMap';
import useMetrics from '../../hooks/use-metrics';
import { ViewStyle } from 'react-native';
import { useState } from 'react';
import { MapNavigationContext } from '../../contexts/MapContext';

const Map = () => {
  const [mapNavigation, setMapNavigation] = useState(MapNavigation.MAP);
  const { ms } = useMetrics();
  const buttonFixedSize: number = 70;
  const scaleFactor: number = 1;
  const buttonCustomStyleObj: ViewStyle = {
    width: ms(buttonFixedSize, scaleFactor),
    height: ms(buttonFixedSize, scaleFactor),
    position: 'absolute',
    top: '25%',
    borderRadius: '50%',
  };

  const handlerPress = () => {
    setMapNavigation(
      mapNavigation === MapNavigation.MAP
        ? MapNavigation.OLD_SCHOOL_MAP
        : MapNavigation.MAP,
    );
  };

  const changeScreen = (currentScreen: number) => {
    switch (currentScreen) {
      case MapNavigation.MAP:
        return (
          <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.MAP}>
            <Button
              customStyleObj={buttonCustomStyleObj}
              onPress={handlerPress}
              backgroundImgSrc={ButtonBackgroundImgSrc.OLD_SCHOOL_THEMED}
              text=""
            />
          </ScreenContainer>
        );
      case MapNavigation.OLD_SCHOOL_MAP:
        return <OldSchoolMap />;
    }
  };

  return (
    <MapNavigationContext.Provider value={{ mapNavigation, setMapNavigation }}>
      {changeScreen(mapNavigation)}
    </MapNavigationContext.Provider>
  );
};

export default Map;
