import {
  ButtonBackgroundImgSrc,
  MapNavigation,
  OldSchoolLocation,
  ScreenBackgroundImgSrc,
  UserRole,
} from '../../constants';
import ScreenContainer from '../ScreenContainer';
import Button from '../Button';
import React, { useContext, useState } from 'react';
import { MapNavigationContext } from '../../contexts/MapContext';
import type { MapNavigationContextInterface } from '../../interfaces/Map';
import { ViewStyle } from 'react-native';
import useMetrics from '../../hooks/use-metrics';
import { UserContext } from '../../contexts/UserContext';
import AcolyteAngeloLab from '../roles/acolyte/AcolyteAngeloLab';
import ScanQr from '../roles/istvan/ScanQr';
import MortimerAngeloLab from '../roles/mortimer/MortimerAngeloLab';
import GoBackButton from '../GoBackButton';

const OldSchoolMap = () => {
  const [currentOldSchoolLocation, setCurrentOldSchoolLocation] =
    useState<OldSchoolLocation>(OldSchoolLocation.MAP);

  const { setMapNavigation } =
    useContext<MapNavigationContextInterface>(MapNavigationContext);

  const handlePress = (newLocation: MapNavigation | OldSchoolLocation) => {
    if (newLocation === MapNavigation.MAP) {
      setMapNavigation(newLocation);
    } else {
      setCurrentOldSchoolLocation(newLocation as OldSchoolLocation);
    }
  };

  const { user } = useContext(UserContext)!;

  const { ms } = useMetrics();

  const getAngeloLabButton = () => {
    if (user!.rol === UserRole.VILLAIN) return null;

    const buttonFixedSize: number = 110;
    const scaleFactor: number = 0.5;
    const buttonCustomStyleObj: ViewStyle = {
      width: ms(buttonFixedSize, scaleFactor),
      height: ms(buttonFixedSize, scaleFactor),
      position: 'absolute',
      top: '21.25%',
    };

    return (
      <Button
        customStyleObj={buttonCustomStyleObj}
        onPress={() => {
          handlePress(OldSchoolLocation.ANGELO_LAB);
        }}
        backgroundImgSrc={ButtonBackgroundImgSrc.ANGELO_LAB}
        text=""
      />
    );
  };

  const getContent = () => {
    let content;

    switch (currentOldSchoolLocation) {
      case OldSchoolLocation.MAP: {
        content = (
          <ScreenContainer
            backgroundImgSrc={ScreenBackgroundImgSrc.OLD_SCHOOL_MAP}
          >
            <GoBackButton
              onPress={() => {
                handlePress(MapNavigation.MAP);
              }}
            />

            {getAngeloLabButton()}
          </ScreenContainer>
        );
        break;
      }

      case OldSchoolLocation.ANGELO_LAB: {
        content =
          user!.rol === UserRole.ACOLYTE ? (
            <AcolyteAngeloLab />
          ) : user!.rol === UserRole.ISTVAN ? (
            <ScanQr />
          ) : (
            <MortimerAngeloLab />
          );
        break;
      }
    }

    return content;
  };

  return getContent();
};

export default OldSchoolMap;
