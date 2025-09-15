import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { colors, spacing } from '../../../utils/constants';
import { BottomNavigationProps, TabType } from './BottomNavigation.types';
import Paw from '../../../../assets/svg/Paw';
import MessageIcon from '../../../../assets/svg/MessageIcon';
import ProfileIcon from '../../../../assets/svg/ProfileIcon';

const Container = styled.View`
  flex-direction: row;
  background-color: ${colors.white};
  border-radius: 30px;
  padding-horizontal: ${spacing.md}px;
  padding-vertical: ${spacing.sm}px;
  shadow-color: ${colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 4;
  margin-horizontal: ${spacing.lg}px;
  margin-bottom: 50px;
  align-self: center;
  width: 200px;
  height: 55px;
`;

const TabContainer = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-vertical: ${spacing.sm}px;
`;

const Tab = styled.View<{ isActive: boolean }>`
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
`;

export const BottomTabBar: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
}) => {
  const tabs: TabType[] = ['swipe', 'matches', 'profile'];

  const renderIcon = (tab: TabType) => {
    const isActive = activeTab === tab;
    const iconColor = isActive ? colors.primary : colors.black;
    
    switch (tab) {
      case 'swipe':
        return <Paw width={24} height={24} selected={isActive} color={iconColor} />;
      case 'matches':
        return <MessageIcon width={24} height={24} selected={isActive} color={iconColor} />;
      case 'profile':
        return <ProfileIcon width={24} height={24} selected={isActive} color={iconColor} />;
      default:
        return <Paw width={24} height={24} selected={isActive} color={iconColor} />;
    }
  };

  return (
    <Container>
      {tabs.map((tab) => (
        <TabContainer
          key={tab}
          onPress={() => onTabPress(tab)}
          activeOpacity={0.7}
        >
          <Tab isActive={activeTab === tab}>
            {renderIcon(tab)}
          </Tab>
        </TabContainer>
      ))}
    </Container>
  );
};
