import { useRef, useCallback } from 'react';
import { Animated, Dimensions } from 'react-native';
import { UseSwipeGestureReturn, UseSwipeGestureOptions } from './useSwipeGesture.types';

const { width: screenWidth } = Dimensions.get('window');
const SWIPE_THRESHOLD = screenWidth * 0.3;

export const useSwipeGesture = (options: UseSwipeGestureOptions = {}): UseSwipeGestureReturn => {
  const { onSwipeLeft: onSwipeLeftCallback, onSwipeRight: onSwipeRightCallback, threshold = SWIPE_THRESHOLD } = options;
  
  const pan = useRef(new Animated.ValueXY()).current;
  const likeOpacity = useRef(new Animated.Value(0)).current;
  const nopeOpacity = useRef(new Animated.Value(0)).current;

  const rotate = pan.x.interpolate({
    inputRange: [-screenWidth / 2, 0, screenWidth / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const likeOpacityInterpolate = pan.x.interpolate({
    inputRange: [0, threshold],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacityInterpolate = pan.x.interpolate({
    inputRange: [-threshold, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const resetPosition = useCallback(() => {
    Animated.parallel([
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }),
      Animated.timing(likeOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(nopeOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [pan, likeOpacity, nopeOpacity]);

  const onSwipeLeft = useCallback(() => {
    Animated.parallel([
      Animated.timing(pan, {
        toValue: { x: -screenWidth, y: 0 },
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(nopeOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start(() => {
      onSwipeLeftCallback?.();
      resetPosition();
    });
  }, [pan, nopeOpacity, onSwipeLeftCallback, resetPosition]);

  const onSwipeRight = useCallback(() => {
    Animated.parallel([
      Animated.timing(pan, {
        toValue: { x: screenWidth, y: 0 },
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(likeOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start(() => {
      onSwipeRightCallback?.();
      resetPosition();
    });
  }, [pan, likeOpacity, onSwipeRightCallback, resetPosition]);

  return {
    pan,
    rotate,
    likeOpacity: likeOpacityInterpolate,
    nopeOpacity: nopeOpacityInterpolate,
    onSwipeLeft,
    onSwipeRight,
    resetPosition,
  };
};
