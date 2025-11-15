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
import AcolytesList from '../roles/mortimer/AcolytesList';
import GoBackButton from '../GoBackButton';
import HallOfSages from '../HallOfSages';

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

    const buttonFixedSize: number = 70;
    const scaleFactor: number = 1;
    const buttonCustomStyleObj: ViewStyle = {
      width: ms(buttonFixedSize, scaleFactor),
      height: ms(buttonFixedSize, scaleFactor),
      position: 'absolute',
      top: '22.05%',
    };

    return (
      <Button
        customStyleObj={buttonCustomStyleObj}
        onPress={() => {
          handlePress(OldSchoolLocation.ANGELO_LAB);
        }}
        backgroundImgSrc={ButtonBackgroundImgSrc.ANGELO_LAB}
      />
    );
  };

  const getHallOfSagesButton = () => {
    if (user!.rol === UserRole.VILLAIN || !user!.has_been_summoned_to_hos)
      return null;

    const buttonFixedSize: number = 75;
    const scaleFactor: number = 1;
    const buttonCustomStyleObj: ViewStyle = {
      width: ms(buttonFixedSize, scaleFactor),
      height: ms(buttonFixedSize, scaleFactor),
      position: 'absolute',
      top: '42.05%',
    };

    return (
      <Button
        customStyleObj={buttonCustomStyleObj}
        onPress={() => {
          handlePress(OldSchoolLocation.HALL_OF_SAGES);
        }}
        backgroundImgSrc={ButtonBackgroundImgSrc.HALL_OF_SAGES}
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
            {getHallOfSagesButton()}
          </ScreenContainer>
        );
        break;
      }

      case OldSchoolLocation.ANGELO_LAB: {
        const onPressGoBackButton = () => {
          setCurrentOldSchoolLocation(OldSchoolLocation.MAP);
        };

        content =
          user!.rol === UserRole.ACOLYTE ? (
            <AcolyteAngeloLab onPressGoBackButton={onPressGoBackButton} />
          ) : user!.rol === UserRole.ISTVAN ? (
            <ScanQr onPressGoBackButton={onPressGoBackButton} />
          ) : (
            <AcolytesList
              onPressGoBackButton={onPressGoBackButton}
              backgroundImgSrc={ScreenBackgroundImgSrc.MORTIMER_ANGELO_LAB}
              headerText="Angelo's Laboratory Access Log"
              fieldToFilterAcolytesBy="isInside"
            />
          );

        break;
      }
      case OldSchoolLocation.HALL_OF_SAGES: {
        const onPressGoBackButton = () => {
          setCurrentOldSchoolLocation(OldSchoolLocation.MAP);
        };

        content = <HallOfSages onPressGoBackButton={onPressGoBackButton} />;

        break;
      }
    }

    return content;
  };

  return getContent();
};

export default OldSchoolMap;
