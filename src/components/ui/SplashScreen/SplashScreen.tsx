import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleProp, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import { colors } from '../../../utils/constants';

const { width,  } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
  lottieSource?: any;
}

const Container = styled(View)`
  flex: 1;
  background-color: ${colors.background};
  justify-content: center;
  align-items: center;
`;

const LottieContainer = styled(View)`
  width: ${width * 0.6}px;
  height: ${width * 0.6}px;
`;

export const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onFinish, 
  lottieSource 
}) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!showSplash) {
    return null;
  }

  return (
    <Container>
      <LottieContainer>
        {lottieSource && (
          <LottieView
            source={lottieSource}
            autoPlay
            speed={0.5}
            loop
            style={{
              width: '100%',
              height: '100%',
            } as StyleProp<ViewStyle>}
          />
        )}
      </LottieContainer>
    </Container>
  );
};
