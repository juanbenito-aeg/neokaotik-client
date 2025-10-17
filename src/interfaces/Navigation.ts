import { ViewStyle } from 'react-native';

interface AdaptiveNavigatorData {
  screens: Screens;
  thematicColor: string;
  thematicColorInDeg: string;
  tabBarIconWidthHeight: number;
  tabBarStyle: ViewStyle;
}

interface Screens {
  Home?: Element;
  Settings?: Element;
  AngeloLab?: Element;
  ScanQr?: Element;
}

export type { AdaptiveNavigatorData };
