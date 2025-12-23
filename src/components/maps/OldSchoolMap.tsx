import { UserRole } from '../../constants/general';
import { MapNavigation, OldSchoolLocation } from '../../constants/navigation';
import {
  ScreenBackgroundImgSrc,
  ButtonBackgroundImgSrc,
} from '../../constants/image-sources';
import ScreenContainer from '../ScreenContainer';
import Button from '../Button';
import React, { useEffect, useState } from 'react';
import { ViewStyle } from 'react-native';
import useMetrics from '../../hooks/use-metrics';
import AcolyteAngeloLab from '../roles/acolyte/AcolyteAngeloLab';
import ScanQr from '../roles/istvan/ScanQr';
import AcolytesList from '../roles/mortimer/AcolytesList';
import GoBackButton from '../GoBackButton';
import HallOfSages from '../HallOfSages';
import { OldSchoolMapProps } from '../../interfaces/OldSchoolMap';
import { useMapStore } from '../../store/useMapStore';
import usePlayerStore from '../../store/usePlayerStore';
import Dungeon from '../Dungeon';

const OldSchoolMap = ({
  initialLocation,
  setSpecificLocation,
}: OldSchoolMapProps) => {
  const [currentOldSchoolLocation, setCurrentOldSchoolLocation] =
    useState<OldSchoolLocation>(initialLocation || OldSchoolLocation.MAP);

  const setMapNavigation = useMapStore(state => state.setMapNavigation);

  const handlePress = (newLocation: MapNavigation | OldSchoolLocation) => {
    if (newLocation === MapNavigation.MAP) {
      setMapNavigation(newLocation);
    } else {
      setCurrentOldSchoolLocation(newLocation as OldSchoolLocation);
    }
  };

  const onPressGoBackButton = () => {
    setCurrentOldSchoolLocation(OldSchoolLocation.MAP);
  };

  useEffect(() => {
    if (initialLocation) {
      setCurrentOldSchoolLocation(initialLocation);
      setSpecificLocation(null);
    }
  }, [initialLocation]);

  const user = usePlayerStore(state => state.user);

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
    if (user?.rol === UserRole.ACOLYTE && !user?.has_been_summoned_to_hos)
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

  const getDungeonButton = () => {
    const buttonFixedSize: number = 75;
    const scaleFactor: number = 1;
    const buttonCustomStyleObj: ViewStyle = {
      width: ms(buttonFixedSize, scaleFactor),
      height: ms(buttonFixedSize, scaleFactor),
      position: 'absolute',
      bottom: '30%',
    };

    return (
      <Button
        customStyleObj={buttonCustomStyleObj}
        onPress={() => {
          handlePress(OldSchoolLocation.DUNGEON);
        }}
        backgroundImgSrc={ButtonBackgroundImgSrc.DUNGEON}
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

            {getDungeonButton()}
            {getAngeloLabButton()}
            {getHallOfSagesButton()}
          </ScreenContainer>
        );
        break;
      }

      case OldSchoolLocation.ANGELO_LAB: {
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
        content = <HallOfSages onPressGoBackButton={onPressGoBackButton} />;

        break;
      }
      case OldSchoolLocation.DUNGEON: {
        content = <Dungeon onPressGoBackButton={onPressGoBackButton} />;

        break;
      }
    }

    return content;
  };

  return getContent();
};

export default OldSchoolMap;
