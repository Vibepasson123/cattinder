import React from 'react';
import Svg, { Path, Defs, RadialGradient, Stop } from 'react-native-svg';

interface TinderProps {
  width?: number;
  height?: number;
  selected?: boolean;
  color?: string;
}

const Tinder: React.FC<TinderProps> = ({ 
  width = 18, 
  height = 18, 
  selected = false,
  color = "#434141"
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 17 16"
      fill="none"
    >
      <Path
        d="M6.078 6.66c-.02 0-.034 0-.048-.015-.47-.622-.588-1.695-.616-2.103-.007-.08-.097-.121-.166-.083-1.453.813-2.802 2.743-2.802 4.605 0 3.207 2.224 5.895 6.054 5.895 3.588 0 6.054-2.768 6.054-5.892 0-4.086-2.916-6.791-5.514-8.016-.07-.034-.146.025-.139.097.34 2.204-.124 4.595-2.826 5.518l.003-.007z"
        fill={selected ? "url(#paint0_radial_2_43)" : color}
      />
      <Defs>
        <RadialGradient
          id="paint0_radial_2_43"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(12.1085 0 0 13.9177 8.5 14.959)"
        >
          <Stop stopColor="#EC537E" />
          <Stop offset={1} stopColor="#FD267D" />
        </RadialGradient>
      </Defs>
    </Svg>
  );
};

export default Tinder;
