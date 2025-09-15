import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Image, Dimensions, Animated, PanResponder } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../../utils/constants';
import { CatCard as CatCardData } from '../../../types/api.types';

const { width: screenWidth } = Dimensions.get('window');
const SWIPE_THRESHOLD = screenWidth * 0.25;

interface SwipeableCatCardProps {
  cat: CatCardData;
  onSwipe: (direction: 'left' | 'right') => void;
  onPress: () => void;
  style?: any;
  children?: React.ReactNode;
}

export interface SwipeableCatCardRef {
  swipeLeft: () => void;
  swipeRight: () => void;
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background-color: ${colors.white};
  shadow-color: black;
  shadow-offset: 0px 4px;
  shadow-opacity: 1;
  shadow-radius: 8px;
  elevation: 8;
  overflow: hidden;
`;

const CatImage = styled(Image)`
  width: 100%;
  height: 100%;
  resize-mode: cover;
  shadow-color: black;
  shadow-offset: 0px 6px;
  shadow-opacity: 1;
  shadow-radius: 16px;
  elevation: 12;
`;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  z-index: 10;
`;

const LikeOverlay = styled(Overlay)`
  background-color: rgba(0, 255, 0, 0.4);
`;

const DislikeOverlay = styled(Overlay)`
  background-color: rgba(255, 0, 0, 0.4);
`;

const OverlayText = styled.Text`
  font-size: 64px;
  font-weight: bold;
  color: white;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
`;

export const SwipeableCatCard = forwardRef<
  SwipeableCatCardRef,
  SwipeableCatCardProps
>(({ cat, onSwipe, onPress, style, children }, ref) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const likeOpacity = useRef(new Animated.Value(0)).current;
  const dislikeOpacity = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => ({
    swipeLeft: () => {
      Animated.timing(dislikeOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(rotate, {
          toValue: -0.35,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          Animated.parallel([
            Animated.timing(translateX, {
              toValue: -screenWidth * 1.5,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ]).start(() => {
            onSwipe('left');
          });
        });
      });
    },
    swipeRight: () => {
      Animated.timing(likeOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(rotate, {
          toValue: 0.35,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          Animated.parallel([
            Animated.timing(translateX, {
              toValue: screenWidth * 1.5,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ]).start(() => {
            onSwipe('right');
          });
        });
      });
    },
  }));

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
    },
    onPanResponderGrant: () => {
      translateX.extractOffset();
      translateY.extractOffset();
    },
    onPanResponderMove: (_, gestureState) => {
      translateX.setValue(gestureState.dx);
      translateY.setValue(gestureState.dy * 0.1);
      const rotationValue = gestureState.dx * 0.1 * (Math.PI / 180);
      rotate.setValue(rotationValue);
      const distance = Math.abs(gestureState.dx);
      const scaleValue = Math.max(0.95, 1 - distance / 1000);
      scale.setValue(scaleValue);

      if (gestureState.dx > 0) {
        const opacity = Math.min(gestureState.dx / 100, 1);
        likeOpacity.setValue(opacity);
        dislikeOpacity.setValue(0);
      } else if (gestureState.dx < 0) {
        const opacity = Math.min(Math.abs(gestureState.dx) / 100, 1);
        dislikeOpacity.setValue(opacity);
        likeOpacity.setValue(0);
      } else {
        likeOpacity.setValue(0);
        dislikeOpacity.setValue(0);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      translateX.flattenOffset();
      translateY.flattenOffset();

      const shouldSwipeLeft = gestureState.dx < -SWIPE_THRESHOLD;
      const shouldSwipeRight = gestureState.dx > SWIPE_THRESHOLD;

      if (shouldSwipeLeft) {
        Animated.timing(rotate, {
          toValue: -0.35,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          Animated.parallel([
            Animated.timing(translateX, {
              toValue: -screenWidth * 1.5,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ]).start(() => {
            onSwipe('left');
          });
        });
      } else if (shouldSwipeRight) {
        Animated.timing(rotate, {
          toValue: 0.35,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          Animated.parallel([
            Animated.timing(translateX, {
              toValue: screenWidth * 1.5,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ]).start(() => {
            onSwipe('right');
          });
        });
      } else {
        Animated.parallel([
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.spring(rotate, {
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
          Animated.timing(likeOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(dislikeOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    },
  });

  const animatedStyle = {
    transform: [
      { translateX },
      { translateY },
      {
        rotate: rotate.interpolate({
          inputRange: [-0.5, 0, 0.5],
          outputRange: ['-20deg', '0deg', '20deg'],
        }),
      },
      { scale },
    ],
  };

  const handlePress = () => {
    translateX.stopAnimation((value: number) => {
      if (Math.abs(value) < 10) {
        onPress();
      }
    });
  };

  return (
    <Animated.View
      style={[animatedStyle, style]}
      {...panResponder.panHandlers}
      onTouchEnd={handlePress}
    >
      <Container>
        <CatImage source={{ uri: cat.image.url }} resizeMode="cover" />
        {children}

        <Animated.View style={{ opacity: likeOpacity }}>
          <LikeOverlay>
            <OverlayText>LIKE</OverlayText>
          </LikeOverlay>
        </Animated.View>

        <Animated.View style={{ opacity: dislikeOpacity }}>
          <DislikeOverlay>
            <OverlayText>NOPE</OverlayText>
          </DislikeOverlay>
        </Animated.View>
      </Container>
    </Animated.View>
  );
});
