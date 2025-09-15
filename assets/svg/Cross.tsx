import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CrossProps {
  width?: number;
  height?: number;
  selected?: boolean;
  color?: string;
}

const Cross: React.FC<CrossProps> = ({ 
  width = 24, 
  height = 24, 
  selected = false,
  color = "#434141"
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
    >
      <Path
        d="M24 8L8 24M8 8l16 16"
        stroke={selected ? "#FF6B9D" : color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Cross;
