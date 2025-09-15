import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { ToggleSwitch } from '../../components/ui/ToggleSwitch';
import { colors, spacing } from '../../utils/constants';
import { SwipeScreenProps } from './SwipeScreen.types';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Content = styled.View`
  flex: 1;
  padding-top: ${spacing.lg}px;
`;

export const StackSwipeScreen: React.FC<SwipeScreenProps> = () => {
  return (
    <Container>
      <Content>
        <ToggleSwitch
          activeTab={'tinder'}
          onTabChange={tab => console.log('hit', tab)}
        />
      </Content>
    </Container>
  );
};
