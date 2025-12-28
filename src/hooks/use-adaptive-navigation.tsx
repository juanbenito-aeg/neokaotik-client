import { useMemo } from 'react';
import AcolyteHome from '../components/roles/acolyte/AcolyteHome';
import AcolyteSettings from '../components/roles/acolyte/AcolyteSettings';
import { createStaticNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import IstvanHome from '../components/roles/istvan/IstvanHome';
import IstvanSettings from '../components/roles/istvan/IstvanSettings';
import MortimerHome from '../components/roles/mortimer/MortimerHome';
import MortimerSettings from '../components/roles/mortimer/MortimerSettings';
import VillainHome from '../components/roles/villain/VillainHome';
import VillainSettings from '../components/roles/villain/VIllainSettings';
import { AdaptiveNavigatorData } from '../interfaces/Navigation';
import Map from '../components/maps/Map';
import { UserRole } from '../constants/general';
import { Tab } from '../constants/navigation';
import useMetrics from './use-metrics';
import usePlayerStore from '../store/usePlayerStore';
import EnchantedMirror from '../components/roles/acolyte/EnchantedMirror';

const TabIcon = styled.Image<{
  $widthHeight: number;
  $focused: boolean;
  $colorInDeg: string;
}>`
  width: ${({ $widthHeight }) => $widthHeight}px;
  height: ${({ $widthHeight }) => $widthHeight}px;
  filter: brightness(${({ $focused }) => ($focused ? 150 : 100)}%)
    grayscale(${({ $focused }) => ($focused ? 0 : 100)}%)
    hue-rotate(${({ $colorInDeg }) => $colorInDeg});
`;

function createNavigatorAdaptedToUserRole(
  adaptiveNavigatorData: AdaptiveNavigatorData,
) {
  const Navigator = createBottomTabNavigator({
    screenOptions: ({ route }) => ({
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }) => {
        let tabIconSource;

        switch (route.name) {
          case Tab.HOME:
            tabIconSource = require('../../public/images/icons/home.png');
            break;

          case Tab.MAP:
            tabIconSource = require('../../public/images/icons/map.png');
            break;

          case Tab.ACOLYTE_PANEL:
            tabIconSource = require('../../public/images/icons/acolyte-panel.png');
            break;

          case Tab.SETTINGS:
            tabIconSource = require('../../public/images/icons/settings.png');
            break;
        }

        return (
          <TabIcon
            source={tabIconSource}
            $widthHeight={adaptiveNavigatorData.tabBarIconWidthHeight}
            $focused={focused}
            $colorInDeg={adaptiveNavigatorData.thematicColorInDeg}
          />
        );
      },
      tabBarBackground: () => (
        <BlurView
          blurAmount={6}
          overlayColor={adaptiveNavigatorData.thematicColor}
          style={{ height: '100%' }}
        />
      ),
      tabBarItemStyle: { flexDirection: 'row', alignItems: 'center' },
      tabBarStyle: adaptiveNavigatorData.tabBarStyle,
      headerShown: false,
    }),
    screens: adaptiveNavigatorData.screens,
  });

  return Navigator;
}

export default function useAdaptiveNavigation() {
  const user = usePlayerStore(state => state.user);

  const { ms } = useMetrics();

  const Navigation = useMemo(() => {
    const adaptiveNavigatorData: AdaptiveNavigatorData = {
      screens: {},
      thematicColor: '',
      thematicColorInDeg: '',
      tabBarIconWidthHeight: ms(25, 0.6),
      tabBarStyle: {
        height: ms(50, 0.6),
        position: 'absolute',
        overflow: 'hidden',
        borderTopWidth: 0,
      },
    };

    const MapScreenData = {
      screen: Map,
      initialParams: { tabBarStyle: adaptiveNavigatorData.tabBarStyle },
    };

    switch (user?.rol) {
      case UserRole.ACOLYTE:
        adaptiveNavigatorData.screens.Home = AcolyteHome;
        if (!user?.isBetrayer) {
          adaptiveNavigatorData.screens.AcolytePanel = EnchantedMirror;
        }
        adaptiveNavigatorData.screens.Map = MapScreenData;
        adaptiveNavigatorData.screens.Settings = AcolyteSettings;
        adaptiveNavigatorData.thematicColor = 'rgba(191 170 132 / 0.15)';
        adaptiveNavigatorData.thematicColorInDeg = '39deg';
        break;

      case UserRole.ISTVAN:
        adaptiveNavigatorData.screens.Home = IstvanHome;
        adaptiveNavigatorData.screens.Map = MapScreenData;
        adaptiveNavigatorData.screens.Settings = IstvanSettings;
        adaptiveNavigatorData.thematicColor = 'rgba(38 37 35 / 0.5)';
        adaptiveNavigatorData.thematicColorInDeg = '220deg';
        break;

      case UserRole.MORTIMER:
        adaptiveNavigatorData.screens.Home = MortimerHome;
        adaptiveNavigatorData.screens.Map = MapScreenData;
        adaptiveNavigatorData.screens.Settings = MortimerSettings;
        adaptiveNavigatorData.thematicColor = 'rgba(191 245 205 / 0.15)';
        adaptiveNavigatorData.thematicColorInDeg = '136deg';
        break;

      case UserRole.VILLAIN:
        adaptiveNavigatorData.screens.Home = VillainHome;
        adaptiveNavigatorData.screens.Map = MapScreenData;
        adaptiveNavigatorData.screens.Settings = VillainSettings;
        adaptiveNavigatorData.thematicColor = 'rgba(57 89 68 / 0.25)';
        adaptiveNavigatorData.thematicColorInDeg = '141deg';
        break;
    }

    const Navigator = createNavigatorAdaptedToUserRole(adaptiveNavigatorData);

    const Navigation = createStaticNavigation(Navigator);

    return Navigation;
  }, []);

  return Navigation;
}
