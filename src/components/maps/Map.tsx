import {
  MapNavigation,
  ScreenBackgroundImgSrc,
  ButtonBackgroundImgSrc,
  Tab,
} from '../../constants';
import ScreenContainer from '../ScreenContainer';
import Button from '../Button';
import OldSchoolMap from './OldSchoolMap';
import useMetrics from '../../hooks/use-metrics';
import { ViewStyle } from 'react-native';
import { useState, useEffect } from 'react';
import {
  MapNavigationContext,
  TabBarStyleContext,
} from '../../contexts/MapContext';
import {
  EventMapCore,
  NavigationState,
  useNavigation,
} from '@react-navigation/native';
import { MapProps } from '../../interfaces/Map';

const Map = ({ route }: MapProps) => {
  const [mapNavigation, setMapNavigation] = useState(MapNavigation.MAP);

  const navigation = useNavigation();
  const { tabBarStyle } = route.params;

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

  const handlePress = () => {
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
              onPress={handlePress}
              backgroundImgSrc={ButtonBackgroundImgSrc.OLD_SCHOOL_THEMED}
              text=""
            />
          </ScreenContainer>
        );

      case MapNavigation.OLD_SCHOOL_MAP:
        return <OldSchoolMap />;
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

  return (
    <MapNavigationContext.Provider value={{ mapNavigation, setMapNavigation }}>
      <TabBarStyleContext value={tabBarStyle}>
        {changeScreen(mapNavigation)}
      </TabBarStyleContext>
    </MapNavigationContext.Provider>
  );
};

export default Map;
