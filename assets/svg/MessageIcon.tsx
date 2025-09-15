import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MessageIconProps {
  width?: number;
  height?: number;
  selected?: boolean;
  color?: string;
}

const MessageIcon: React.FC<MessageIconProps> = ({ 
  width = 18, 
  height = 18, 
  selected = false,
  color = "#434141"
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
    >
      <Path
        d="M16.5 8.583a6.982 6.982 0 01-.75 3.167 7.084 7.084 0 01-6.333 3.917 6.983 6.983 0 01-3.167-.75L1.5 16.5l1.583-4.75a6.983 6.983 0 01-.75-3.167A7.083 7.083 0 016.25 2.25a6.983 6.983 0 013.167-.75h.416A7.066 7.066 0 0116.5 8.167v.416z"
        stroke={selected ? "#FF6B9D" : color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default MessageIcon;
