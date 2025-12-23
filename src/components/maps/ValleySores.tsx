import { useState } from 'react';
import { MapNavigation, ValleySoresLocation } from '../../constants/navigation';
import ScreenContainer from '../ScreenContainer';
import {
  ButtonBackgroundImgSrc,
  ScreenBackgroundImgSrc,
} from '../../constants/image-sources';
import useMapStore from '../../store/useMapStore';
import GoBackButton from '../GoBackButton';
import InnOfForgotten from '../InnOfForgotten';
import Button from '../Button';
import { ViewStyle } from 'react-native';
import useMetrics from '../../hooks/use-metrics';

const ValleySores = () => {
  const [currentValleySoresLocation, setCurrentValleySoresLocation] =
    useState<ValleySoresLocation>(ValleySoresLocation.MAP);

  const setMapNavigation = useMapStore(state => state.setMapNavigation);

  const { ms } = useMetrics();

  function handlePress(newLocation: MapNavigation | ValleySoresLocation) {
    if (newLocation === MapNavigation.MAP) {
      setMapNavigation(newLocation);
    } else {
      setCurrentValleySoresLocation(newLocation as ValleySoresLocation);
    }
  }

  const getInnForgottenButton = () => {
    const buttonFixedSize: number = 90;
    const scaleFactor: number = 1;
    const buttonCustomStyleObj: ViewStyle = {
      width: ms(buttonFixedSize, scaleFactor),
      height: ms(buttonFixedSize, scaleFactor),
      position: 'absolute',
      top: '25%',
    };

    return (
      <Button
        customStyleObj={buttonCustomStyleObj}
        onPress={() => {
          handlePress(ValleySoresLocation.INN_FORGOTTEN);
        }}
        backgroundImgSrc={ButtonBackgroundImgSrc.INN_FORGOTTEN}
      />
    );
  };

  let content;

  switch (currentValleySoresLocation) {
    case ValleySoresLocation.MAP: {
      content = (
        <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.VALLEY_SORES}>
          <GoBackButton
            onPress={() => {
              handlePress(MapNavigation.MAP);
            }}
          />
          {getInnForgottenButton()}
        </ScreenContainer>
      );

      break;
    }
    case ValleySoresLocation.INN_FORGOTTEN: {
      const onPressGoBackButton = () => {
        setCurrentValleySoresLocation(ValleySoresLocation.MAP);
      };

      content = <InnOfForgotten onPressGoBackButton={onPressGoBackButton} />;

      break;
    }
  }

  return content;
};

export default ValleySores;
