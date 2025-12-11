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
import Button from '../Button';
import OldSchoolMap from './OldSchoolMap';
import useMetrics from '../../hooks/use-metrics';
import { ViewStyle } from 'react-native';
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
import { useMapStore } from '../../store/useMapStore';
import usePlayerStore from '../../store/usePlayerStore';
import Obituary from '../Obituary';

const Map = ({ route }: MapProps) => {
  const [specificLocation, setSpecificLocation] =
    useState<OldSchoolLocation | null>(null);

  const mapNavigation = useMapStore(state => state.mapNavigation);
  const setMapNavigation = useMapStore(state => state.setMapNavigation);

  const user = usePlayerStore(state => state.user);
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

  const { ms } = useMetrics();
  const buttonFixedSize: number = 70;
  const scaleFactor: number = 1;
  const buttonCustomStyleObj: ViewStyle = {
    width: ms(buttonFixedSize, scaleFactor),
    height: ms(buttonFixedSize, scaleFactor),
    position: 'absolute',
    top: '25%',
  };

  const handlePress = (newMapNavigation: MapNavigation) => {
    setMapNavigation(newMapNavigation);
  };

  useEffect(() => {
    const updatedUser = { ...user!, is_in_tower_entrance: false };
    setUser(updatedUser);
    updateAcolyteTowerEntranceStatus(false);
  }, []);

  const changeScreen = (currentScreen: MapNavigation) => {
    switch (currentScreen) {
      case MapNavigation.MAP:
        return (
          <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.MAP}>
            <Button
              customStyleObj={buttonCustomStyleObj}
              onPress={() => {
                handlePress(MapNavigation.OLD_SCHOOL_MAP);
              }}
              backgroundImgSrc={ButtonBackgroundImgSrc.OLD_SCHOOL}
            />

            <Button
              customStyleObj={{
                ...buttonCustomStyleObj,
                top: '50%',
                left: '48%',
              }}
              onPress={() => {
                handlePress(MapNavigation.SWAMP);
              }}
              backgroundImgSrc={ButtonBackgroundImgSrc.SWAMP}
            />

            {(user!.rol === UserRole.ACOLYTE ||
              user!.rol === UserRole.MORTIMER) && (
              <Button
                customStyleObj={{
                  ...buttonCustomStyleObj,
                  top: '67%',
                  left: '46.5%',
                }}
                onPress={() => {
                  handlePress(MapNavigation.SWAMP_TOWER);
                }}
                backgroundImgSrc={ButtonBackgroundImgSrc.SWAMP_TOWER}
              />
            )}

            {acolytes.find(
              acolyte => acolyte.has_completed_artifacts_search,
            ) && (
              <Button
                customStyleObj={{
                  ...buttonCustomStyleObj,
                  top: '36%',
                  left: '20%',
                }}
                onPress={() => {
                  handlePress(MapNavigation.OBITUARY);
                }}
                backgroundImgSrc={ButtonBackgroundImgSrc.OBITUARY}
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
        return user!.rol === UserRole.ACOLYTE ? (
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
    }
  };

  return <>{changeScreen(mapNavigation)}</>;
};

export default Map;
