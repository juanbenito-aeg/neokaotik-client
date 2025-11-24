import { createContext } from 'react';

import { ViewStyle } from 'react-native';

const TabBarStyleContext = createContext<ViewStyle | null>(null);

export { TabBarStyleContext };
