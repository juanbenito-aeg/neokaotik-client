import { useState } from 'react';
import { MapNavigation, ValleySoresLocation } from '../../constants/navigation';
import ScreenContainer from '../ScreenContainer';
import { ScreenBackgroundImgSrc } from '../../constants/image-sources';
import { useMapStore } from '../../store/useMapStore';
import GoBackButton from '../GoBackButton';

const ValleySores = () => {
  const [currentValleySoresLocation, setCurrentValleySoresLocation] =
    useState<ValleySoresLocation>(ValleySoresLocation.MAP);

  const setMapNavigation = useMapStore(state => state.setMapNavigation);

  function handlePress(newLocation: MapNavigation | ValleySoresLocation) {
    if (newLocation === MapNavigation.MAP) {
      setMapNavigation(newLocation);
    } else {
      setCurrentValleySoresLocation(newLocation as ValleySoresLocation);
    }
  }

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
        </ScreenContainer>
      );

      break;
    }
  }

  return content;
};

export default ValleySores;
