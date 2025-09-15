import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ProfileIconProps {
  width?: number;
  height?: number;
  selected?: boolean;
  color?: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ 
  width = 18, 
  height = 18, 
  selected = false,
  color = "#434141"
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        d="M16.667 17.5v-1.667a3.333 3.333 0 00-3.334-3.333H6.667a3.333 3.333 0 00-3.334 3.333V17.5M10 9.167A3.333 3.333 0 1010 2.5a3.333 3.333 0 000 6.667z"
        stroke={selected ? "#FF6B9D" : color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ProfileIcon;
