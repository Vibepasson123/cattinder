import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface StarProps {
  width?: number;
  height?: number;
  selected?: boolean;
  color?: string;
}

const Star: React.FC<StarProps> = ({ 
  width = 18, 
  height = 18, 
  selected = false,
  color = "#FFD700"
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
    >
      <Path
        d="M9 1.5l2.25 4.5h4.5l-3.75 3 1.5 4.5L9 12l-4.5 1.5 1.5-4.5-3.75-3h4.5L9 1.5z"
        fill={selected ? "#FF6B9D" : color}
        stroke={selected ? "#FF6B9D" : color}
        strokeWidth={1}
      />
    </Svg>
  );
};

export default Star;


