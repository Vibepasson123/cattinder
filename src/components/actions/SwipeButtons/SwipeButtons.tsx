import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { colors, spacing } from '../../../utils/constants';
import { SwipeButtonsProps } from './SwipeButtons.types';
import Heart from '../../../../assets/svg/Heart';
import Cross from '../../../../assets/svg/Cross';

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${spacing.xl}px;
  padding-vertical: ${spacing.lg}px;
  gap: ${50}px;
  top: -2%;
`;

const DislikeButton = styled(TouchableOpacity)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  shadow-color: ${colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 4;
`;

const LikeButton = styled(TouchableOpacity)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  shadow-color: ${colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 4;
`;

export const SwipeButtons: React.FC<SwipeButtonsProps> = ({
  onDislike,
  onLike,
  style,
}) => {
  return (
    <Container style={style}>
      <DislikeButton
       
        onPress={onDislike}
        activeOpacity={0.8}
      >
        <Cross width={32} height={32} color="#E16359" />
      </DislikeButton>
      
      <LikeButton
       
        onPress={onLike}
        activeOpacity={0.8}
      >
        <Heart width={32} height={32} color="rgba(107, 216, 142, 1)" />
      </LikeButton>
    </Container>
  );
};