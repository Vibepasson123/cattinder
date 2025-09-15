import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { colors, spacing } from '../../utils/constants';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.neutral};
  margin-bottom: ${spacing.lg}px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: ${colors.neutral};
  text-align: center;
`;

export const StackSwipeScreen: React.FC = () => {
  return (
    <Container>
      <Title>Swipe Screen Stack</Title>
      <Subtitle>cat will appear here</Subtitle>
    </Container>
  );
};