import { ViewStyle } from 'react-native';

export interface SwipeButtonsProps {
  onDislike: () => void;
  onLike: () => void;
  style?: ViewStyle;
}

export interface SwipeButtonsStyles {
  container: ViewStyle;
  button: ViewStyle;
  dislikeButton: ViewStyle;
  likeButton: ViewStyle;
}


