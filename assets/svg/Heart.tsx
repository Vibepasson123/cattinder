import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface HeartProps {
  width?: number;
  height?: number;
  selected?: boolean;
  color?: string;
}

const Heart: React.FC<HeartProps> = ({ 
  width = 32, 
  height = 32, 
  color = "#EC537E"
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
    >
      <Path
        d="M27.787 6.147a7.333 7.333 0 00-10.374 0L16 7.56l-1.413-1.413A7.335 7.335 0 004.213 16.52l1.414 1.413L16 28.307l10.373-10.374 1.414-1.413a7.333 7.333 0 000-10.373z"
        fill={color}
      />
    </Svg>
  );
};

export default Heart;
