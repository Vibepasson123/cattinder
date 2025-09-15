import { ViewStyle, TextStyle } from 'react-native';

export interface SwipeScreenProps {
  // Navigation props will be added later
}

export interface SwipeScreenStyles {
  container: ViewStyle;
  content: ViewStyle;
  cardContainer: ViewStyle;
  buttonsContainer: ViewStyle;
  overlay: ViewStyle;
  likeOverlay: ViewStyle;
  nopeOverlay: ViewStyle;
  overlayText: TextStyle;
}
