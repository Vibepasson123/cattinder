import React from 'react';
import styled from 'styled-components/native';
import { colors, spacing } from '../../../utils/constants';

interface CatInfoOverlayProps {
  breedName: string;
  origin: string;
  adaptability: number;
}

const Container = styled.View`
  position: absolute;
  bottom: -0.5px;
  left: 5%;
  right: 5%;
  width: 90%;
  background-color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: ${spacing.sm}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  shadow-color: black;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 8;
`;

const BreedInfo = styled.View`
  flex: 1;
`;

const BreedName = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.black};
  margin-bottom: 2px;
`;

const Origin = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${colors.neutral};
`;

const PhotoCounter = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.black};
`;

export const CatInfoOverlay: React.FC<CatInfoOverlayProps> = ({
  breedName,
  origin,
  adaptability,
}) => {
  return (
    <Container>
      <BreedInfo>
        <BreedName>{breedName}</BreedName>
        <Origin>{origin}</Origin>
      </BreedInfo>
      <PhotoCounter>{adaptability}</PhotoCounter>
    </Container>
  );
};
