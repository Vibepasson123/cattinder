import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { colors, spacing } from '../../../utils/constants';
import Tinder from '../../../../assets/svg/Tinder';
import Star from '../../../../assets/svg/Star';

const Container = styled.View`
  flex-direction: row;
  background-color: #F3F4F6;
  border-radius: 14px;
  padding: 2px;
  align-self: center;
  margin-bottom: ${spacing.lg}px;
  width: 28%; 
  height: 28px;
`;

const ToggleButton = styled(TouchableOpacity)<{ isActive: boolean }>`
  flex: 1;
  height: 24px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.isActive ? colors.white : 'transparent'};
  shadow-color: ${props => props.isActive ? colors.black : 'transparent'};
  shadow-offset: 0px 1px;
  shadow-opacity: ${props => props.isActive ? 0.1 : 0};
  shadow-radius: 2px;
  elevation: ${props => props.isActive ? 2 : 0};
`;

interface ToggleSwitchProps {
  activeTab: 'tinder' | 'star';
  onTabChange: (tab: 'tinder' | 'star') => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <Container>
      <ToggleButton
        isActive={activeTab === 'tinder'}
        testID="tinder-button"
        onPress={() => onTabChange('tinder')}
        activeOpacity={0.8}
      >
        <Tinder width={24} height={24} selected={activeTab === 'tinder'} />
      </ToggleButton>
      
      <ToggleButton
        isActive={activeTab === 'star'}
        testID="star-button"
        onPress={() => onTabChange('star')}
        activeOpacity={0.8}
      >
        <Star width={24} height={24} selected={activeTab === 'star'} />
      </ToggleButton>
    </Container>
  );
};
