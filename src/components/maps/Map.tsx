import { UserRole } from '../../constants/general';
import {
  Tab,
  MapNavigation,
  OldSchoolLocation,
} from '../../constants/navigation';
import {
  ScreenBackgroundImgSrc,
  ButtonBackgroundImgSrc,
} from '../../constants/image-sources';
import ScreenContainer from '../ScreenContainer';
import OldSchoolMap from './OldSchoolMap';
import { useState, useEffect } from 'react';
import {
  EventMapCore,
  NavigationState,
  useNavigation,
} from '@react-navigation/native';
import { MapProps } from '../../interfaces/Map';
import AcolyteSwampTower from '../roles/acolyte/AcolyteSwampTower';
import AcolytesList from '../roles/mortimer/AcolytesList';
import { updateAcolyteTowerEntranceStatus } from '../../socket/events/tower-entrance';
import Swamp from '../Swamp';
import useMapStore from '../../store/useMapStore';
import usePlayerStore from '../../store/usePlayerStore';
import Obituary from '../Obituary';
import ValleySores from './ValleySores';
import HollowOfLost from '../HollowOfLost';
import { MapLocation } from '../MapLocation';

const Map = ({ route }: MapProps) => {
  const [specificLocation, setSpecificLocation] =
    useState<OldSchoolLocation | null>(null);

  const mapNavigation = useMapStore(state => state.mapNavigation);
  const setMapNavigation = useMapStore(state => state.setMapNavigation);

  const user = usePlayerStore(state => state.user)!;
  const setUser = usePlayerStore(state => state.setUser);

  const acolytes = usePlayerStore(state => state.acolytes);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'tabPress' as keyof EventMapCore<Readonly<NavigationState>>,
      e => {
        const navigationState = navigation.getState()!;

        const isMapScreenFocused =
          navigationState.routes[navigationState.index!].name === Tab.MAP;

        if (isMapScreenFocused && mapNavigation !== MapNavigation.MAP) {
          setMapNavigation(MapNavigation.MAP);
        }
      },
    );

    return unsubscribe;
  }, [mapNavigation]);

  const { screenChangingNotificationData, tabBarStyle } = route.params;

  const setTabBarStyle = useMapStore(state => state.setTabBarStyle);

  useEffect(() => {
    setTabBarStyle(tabBarStyle);
  }, []);

  useEffect(() => {
    if (screenChangingNotificationData?.destination) {
      setMapNavigation(screenChangingNotificationData.destination);
    }

    if (screenChangingNotificationData?.specificLocation) {
      setSpecificLocation(screenChangingNotificationData.specificLocation);
    }
  }, [screenChangingNotificationData]);

  const handlePress = (newMapNavigation: MapNavigation) => {
    setMapNavigation(newMapNavigation);
  };

  useEffect(() => {
    const updatedUser = { ...user, is_in_tower_entrance: false };
    setUser(updatedUser);
    updateAcolyteTowerEntranceStatus(false);
  }, []);

  const isBetrayerAcolyte = user.isBetrayer && user.rol === UserRole.ACOLYTE;

  const mapLocationsTextColor = 'rgb(174, 157, 136)';

  const changeScreen = (currentScreen: MapNavigation) => {
    switch (currentScreen) {
      case MapNavigation.MAP:
        return (
          <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.MAP}>
            <MapLocation
              text="Old School"
              textStyle={{ color: mapLocationsTextColor }}
              position={{ top: '27.25%', left: '30%' }}
              isDisabled={isBetrayerAcolyte}
              onPress={() => {
                handlePress(MapNavigation.OLD_SCHOOL_MAP);
              }}
              backgroundImgSrc={ButtonBackgroundImgSrc.OLD_SCHOOL}
              testID="old-school-button"
            />

            <MapLocation
              text="Swamp"
              textStyle={{ color: mapLocationsTextColor }}
              position={{ top: '52.5%', left: '48%' }}
              onPress={() => {
                handlePress(MapNavigation.SWAMP);
              }}
              backgroundImgSrc={ButtonBackgroundImgSrc.SWAMP}
            />

            {(user.rol === UserRole.ACOLYTE ||
              user.rol === UserRole.MORTIMER) && (
              <MapLocation
                text="Swamp Tower"
                textStyle={{ color: mapLocationsTextColor }}
                position={{ top: '70%', left: '35%' }}
                onPress={() => {
                  handlePress(MapNavigation.SWAMP_TOWER);
                }}
                backgroundImgSrc={ButtonBackgroundImgSrc.SWAMP_TOWER}
              />
            )}

            {acolytes.find(
              acolyte => acolyte.has_completed_artifacts_search,
            ) && (
              <MapLocation
                text="Obituary"
                textStyle={{ color: mapLocationsTextColor }}
                position={{ top: '42.5%', left: '12.5%' }}
                onPress={() => {
                  handlePress(MapNavigation.OBITUARY);
                }}
                backgroundImgSrc={ButtonBackgroundImgSrc.OBITUARY}
              />
            )}

            <MapLocation
              text="Valley of Sores"
              textStyle={{ color: mapLocationsTextColor }}
              position={{ top: '13%', left: '49.5%' }}
              onPress={() => {
                handlePress(MapNavigation.VALLEY_SORES);
              }}
              backgroundImgSrc={ButtonBackgroundImgSrc.VALLEY_SORES}
            />

            {!isBetrayerAcolyte && (
              <MapLocation
                text="Hollow of the Lost"
                textStyle={{ color: mapLocationsTextColor }}
                position={{ top: '30%', left: '60%' }}
                onPress={() => {
                  handlePress(MapNavigation.HOLLOW_LOST);
                }}
                backgroundImgSrc={ButtonBackgroundImgSrc.HOLLOW_LOST}
              />
            )}
          </ScreenContainer>
        );

      case MapNavigation.OLD_SCHOOL_MAP:
        return (
          <OldSchoolMap
            initialLocation={specificLocation}
            setSpecificLocation={setSpecificLocation}
          />
        );

      case MapNavigation.SWAMP:
        return (
          <Swamp
            onPressGoBackButton={() => {
              handlePress(MapNavigation.MAP);
            }}
          />
        );

      case MapNavigation.SWAMP_TOWER:
        return user.rol === UserRole.ACOLYTE ? (
          <AcolyteSwampTower />
        ) : (
          <AcolytesList
            onPressGoBackButton={() => {
              handlePress(MapNavigation.MAP);
            }}
            backgroundImgSrc={ScreenBackgroundImgSrc.MORTIMER_SWAMP_TOWER}
            headerText="Swamp Tower Access Log"
            fieldToFilterAcolytesBy="is_inside_tower"
          />
        );

      case MapNavigation.OBITUARY:
        return (
          <Obituary
            onPressGoBackButton={() => {
              handlePress(MapNavigation.MAP);
            }}
          />
        );

      case MapNavigation.VALLEY_SORES:
        return <ValleySores />;

      case MapNavigation.HOLLOW_LOST: {
        return (
          <HollowOfLost
            onPressGoBackButton={() => {
              handlePress(MapNavigation.MAP);
            }}
          />
        );
      }
    }
  };

  return <>{changeScreen(mapNavigation)}</>;
};

export default Map;
