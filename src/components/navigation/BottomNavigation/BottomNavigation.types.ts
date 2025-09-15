import { ViewStyle } from 'react-native';

export type TabType = 'swipe' | 'matches' | 'profile';

export interface BottomNavigationProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

export interface BottomNavigationStyles {
  container: ViewStyle;
  tabContainer: ViewStyle;
  tab: ViewStyle;
  activeTab: ViewStyle;
  tabIcon: ViewStyle;
  activeTabIcon: ViewStyle;
}


