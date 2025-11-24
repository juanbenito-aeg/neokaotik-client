import {
  MapNavigation,
  ScreenBackgroundImgSrc,
  ButtonBackgroundImgSrc,
  Tab,
  UserRole,
  OldSchoolLocation,
} from '../../constants';
import ScreenContainer from '../ScreenContainer';
import Button from '../Button';
import OldSchoolMap from './OldSchoolMap';
import useMetrics from '../../hooks/use-metrics';
import { ViewStyle } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import {
  EventMapCore,
  NavigationState,
  useNavigation,
} from '@react-navigation/native';
import { MapProps } from '../../interfaces/Map';
import { UserContext } from '../../contexts/UserContext';
import AcolyteSwampTower from '../roles/acolyte/AcolyteSwampTower';
import AcolytesList from '../roles/mortimer/AcolytesList';
import { updateAcolyteTowerEntranceStatus } from '../../socket/events/tower-entrance';
import { useMapStore } from '../../store/useMapStore';

const Map = ({ route }: MapProps) => {
  const mapNavigation = useMapStore(state => state.mapNavigation);
  const setMapNavigation = useMapStore(state => state.setMapNavigation);
  const [specificLocation, setSpecificLocation] =
    useState<OldSchoolLocation | null>(null);

  const { user, setUser } = useContext(UserContext)!;

  const navigation = useNavigation();
  const { screenChangingNotificationData, tabBarStyle } = route.params;

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

            {(user!.rol === UserRole.ACOLYTE ||
              user!.rol === UserRole.MORTIMER) && (
              <Button
                customStyleObj={{ ...buttonCustomStyleObj, top: '60%' }}
                onPress={() => {
                  handlePress(MapNavigation.SWAMP_TOWER);
                }}
                backgroundImgSrc={ButtonBackgroundImgSrc.SWAMP_TOWER}
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
    }
  };

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

  return <>{changeScreen(mapNavigation)}</>;
};

export default Map;
