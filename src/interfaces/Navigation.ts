import { ViewStyle } from 'react-native';

interface AdaptiveNavigatorData {
  screens: Screens;
  thematicColor: string;
  thematicColorInDeg: string;
  tabBarIconWidthHeight: number;
  tabBarStyle: ViewStyle;
}

interface Screens {
  [key: string]: any;
  Home?: Element;
  Settings?: Element;
  AngeloLab?: Element;
  ScanQr?: Element;
  Map?: Element;
  AcolytePanel?: Element;
}

export type { AdaptiveNavigatorData };
