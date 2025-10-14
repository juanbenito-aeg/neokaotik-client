import { useContext } from 'react';
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

const TabIcon = styled.Image`
  width: 25px;
  height: 25px;
  filter: brightness(${props => (props.$focused ? 150 : 100)}%)
    grayscale(${props => (props.$focused ? 0 : 100)}%)
    hue-rotate(${props => props.$colorInDeg});
`;

function createNavigatorAdaptedToUserRole(
  adaptiveNavigatorData: AdaptiveNavigatorData,
) {
  const Navigator = createBottomTabNavigator({
    screenOptions: ({ route }) => {
      return {
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
              $focused={focused}
              $colorInDeg={adaptiveNavigatorData.thematicColorInDeg}
            />
          );
        },
        tabBarBackground: () => {
          return (
            <BlurView
              blurAmount={1}
              overlayColor={adaptiveNavigatorData.thematicColor}
              style={{ height: '100%' }}
            />
          );
        },
        tabBarStyle: adaptiveNavigatorData.tabBarStyle,
        headerShown: false,
      };
    },
    screens: adaptiveNavigatorData.screens,
  });

  return Navigator;
}

function useAdaptiveNavigation() {
  const {
    user: { rol },
  } = useContext(UserContext);

  const adaptiveNavigatorData: AdaptiveNavigatorData = {
    screens: {},
    thematicColor: '',
    thematicColorInDeg: '',
    tabBarStyle: {
      position: 'absolute',
      overflow: 'hidden',
      borderTopWidth: 0,
    },
  };

  switch (rol) {
    case UserRole.ACOLYTE:
      adaptiveNavigatorData.screens.Home = AcolyteHome;
      adaptiveNavigatorData.screens.AngeloLab = {
        screen: AcolyteAngeloLab,
        initialParams: { tabBarStyle: adaptiveNavigatorData.tabBarStyle },
      };
      adaptiveNavigatorData.screens.Settings = AcolyteSettings;
      adaptiveNavigatorData.thematicColor = 'rgba(218 205 176 / 0.1)'; // TODO: Specify unique thematic color
      adaptiveNavigatorData.thematicColorInDeg = '0deg'; // TODO: Specify unique thematic color in degrees
      break;

    case UserRole.ISTVAN:
      adaptiveNavigatorData.screens.Home = IstvanHome;
      adaptiveNavigatorData.screens.ScanQr = {
        screen: ScanQr,
        initialParams: { tabBarStyle: adaptiveNavigatorData.tabBarStyle },
      };
      adaptiveNavigatorData.screens.Settings = IstvanSettings;
      adaptiveNavigatorData.thematicColor = 'rgba(218 205 176 / 0.1)'; // TODO: Specify unique thematic color
      adaptiveNavigatorData.thematicColorInDeg = '0deg'; // TODO: Specify unique thematic color in degrees
      break;

    case UserRole.MORTIMER:
      adaptiveNavigatorData.screens.Home = MortimerHome;
      adaptiveNavigatorData.screens.AngeloLab = MortimerAngeloLab;
      adaptiveNavigatorData.screens.Settings = MortimerSettings;
      adaptiveNavigatorData.thematicColor = 'rgba(218 205 176 / 0.1)'; // TODO: Specify unique thematic color
      adaptiveNavigatorData.thematicColorInDeg = '0deg'; // TODO: Specify unique thematic color in degrees
      break;

    case UserRole.VILLAIN:
      adaptiveNavigatorData.screens.Home = VillainHome;
      adaptiveNavigatorData.screens.Settings = VillainSettings;
      adaptiveNavigatorData.thematicColor = 'rgba(218 205 176 / 0.1)'; // TODO: Specify unique thematic color
      adaptiveNavigatorData.thematicColorInDeg = '0deg'; // TODO: Specify unique thematic color in degrees
      break;
  }

  adaptiveNavigatorData.tabBarStyle.boxShadow = `0 -11.5px 5px ${adaptiveNavigatorData.thematicColor}`;

  const Navigator = createNavigatorAdaptedToUserRole(adaptiveNavigatorData);

  const Navigation = createStaticNavigation(Navigator);

  return Navigation;
}

export default useAdaptiveNavigation;
