import { Animated } from 'react-native';

export interface UseSwipeGestureReturn {
  pan: Animated.ValueXY;
  rotate: Animated.AnimatedInterpolation<string>;
  likeOpacity: Animated.AnimatedInterpolation<number>;
  nopeOpacity: Animated.AnimatedInterpolation<number>;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  resetPosition: () => void;
}

export interface UseSwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}


