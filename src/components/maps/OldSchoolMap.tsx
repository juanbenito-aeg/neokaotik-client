import { UserRole } from '../../constants/general';
import { MapNavigation, OldSchoolLocation } from '../../constants/navigation';
import {
  ScreenBackgroundImgSrc,
  ButtonBackgroundImgSrc,
} from '../../constants/image-sources';
import ScreenContainer from '../ScreenContainer';
import React, { useEffect, useState } from 'react';
import AcolyteAngeloLab from '../roles/acolyte/AcolyteAngeloLab';
import ScanQr from '../roles/istvan/ScanQr';
import AcolytesList from '../roles/mortimer/AcolytesList';
import GoBackButton from '../GoBackButton';
import HallOfSages from '../HallOfSages';
import { OldSchoolMapProps } from '../../interfaces/OldSchoolMap';
import useMapStore from '../../store/useMapStore';
import usePlayerStore from '../../store/usePlayerStore';
import Dungeon from '../Dungeon';
import { MapLocation } from '../MapLocation';

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

  const nonAcolytes = usePlayerStore(state => state.nonAcolytes);

  const angelo = nonAcolytes.find(
    nonAcolyte => nonAcolyte.rol === UserRole.ANGELO,
  )!;

  const mapLocationsTextColor = 'rgb(174, 157, 136)';

  const getAngeloLabButton = () => {
    if (user!.rol === UserRole.VILLAIN) return null;

    return (
      <MapLocation
        text="Angelo's Laboratory"
        textStyle={{ color: mapLocationsTextColor }}
        position={{ top: '22.05%' }}
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

    return (
      <MapLocation
        text="Hall of Sages"
        textStyle={{ color: mapLocationsTextColor }}
        position={{ top: '42.05%', left: '18.5%' }}
        onPress={() => {
          handlePress(OldSchoolLocation.HALL_OF_SAGES);
        }}
        backgroundImgSrc={ButtonBackgroundImgSrc.HALL_OF_SAGES}
      />
    );
  };

  const getDungeonButton = () => (
    <MapLocation
      text="Dungeon"
      textStyle={{ color: mapLocationsTextColor }}
      position={{ top: '42.05%', left: '60.5%' }}
      onPress={() => {
        handlePress(OldSchoolLocation.DUNGEON);
      }}
      backgroundImgSrc={
        angelo.location !== OldSchoolLocation.HALL_OF_SAGES &&
        (angelo.isCaptured || angelo.isGuilty)
          ? ButtonBackgroundImgSrc.DUNGEON_ANGELO
          : ButtonBackgroundImgSrc.DUNGEON
      }
    />
  );

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
