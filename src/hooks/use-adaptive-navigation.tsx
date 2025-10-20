import { useContext, useMemo } from 'react';
import { UserContext } from '../contexts/UserContext';
import AcolyteHome from '../components/roles/acolyte/AcolyteHome';
import AcolyteSettings from '../components/roles/acolyte/AcolyteSettings';
import AcolyteAngeloLab from '../components/roles/acolyte/AcolyteAngeloLab';
import { createStaticNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import IstvanHome from '../components/roles/istvan/IstvanHome';
import IstvanSettings from '../components/roles/istvan/IstvanSettings';
import ScanQr from '../components/roles/istvan/ScanQr';
import MortimerHome from '../components/roles/mortimer/MortimerHome';
import MortimerSettings from '../components/roles/mortimer/MortimerSettings';
import MortimerAngeloLab from '../components/roles/mortimer/MortimerAngeloLab';
import VillainHome from '../components/roles/villain/VillainHome';
import VillainSettings from '../components/roles/villain/VIllainSettings';
import { AdaptiveNavigatorData } from '../interfaces/Navigation';
import { Tab, UserRole } from '../constants';
import useMetrics from './use-metrics';

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
            tabIconSource = require('../../public/images/home-icon.png');
            break;

          case Tab.ANGELO_LAB:
            tabIconSource = require('../../public/images/angelo-lab-icon.png');
            break;

          case Tab.SCAN_QR:
            tabIconSource = require('../../public/images/scan-qr-icon.png');
            break;

          case Tab.SETTINGS:
            tabIconSource = require('../../public/images/settings-icon.png');
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
  const { user } = useContext(UserContext)!;

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

    switch (user?.rol) {
      case UserRole.ACOLYTE:
        adaptiveNavigatorData.screens.Home = AcolyteHome;
        adaptiveNavigatorData.screens.AngeloLab = {
          screen: AcolyteAngeloLab,
          initialParams: { tabBarStyle: adaptiveNavigatorData.tabBarStyle },
          options: { unmountOnBlur: false },
        };
        adaptiveNavigatorData.screens.Settings = AcolyteSettings;
        adaptiveNavigatorData.thematicColor = 'rgba(191 170 132 / 0.15)';
        adaptiveNavigatorData.thematicColorInDeg = '39deg';
        break;

      case UserRole.ISTVAN:
        adaptiveNavigatorData.screens.Home = IstvanHome;
        adaptiveNavigatorData.screens.ScanQr = {
          screen: ScanQr,
          initialParams: { tabBarStyle: adaptiveNavigatorData.tabBarStyle },
          options: { unmountOnBlur: false },
        };
        adaptiveNavigatorData.screens.Settings = IstvanSettings;
        adaptiveNavigatorData.thematicColor = 'rgba(38 37 35 / 0.5)';
        adaptiveNavigatorData.thematicColorInDeg = '220deg';
        break;

      case UserRole.MORTIMER:
        adaptiveNavigatorData.screens.Home = MortimerHome;
        adaptiveNavigatorData.screens.AngeloLab = MortimerAngeloLab;
        adaptiveNavigatorData.screens.Settings = MortimerSettings;
        adaptiveNavigatorData.thematicColor = 'rgba(191 245 205 / 0.15)';
        adaptiveNavigatorData.thematicColorInDeg = '136deg';
        break;

      case UserRole.VILLAIN:
        adaptiveNavigatorData.screens.Home = VillainHome;
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
