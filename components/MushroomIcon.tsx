import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export default function MushroomIcon({ size = 28, color }: { size?: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 13C4 7 7.5 4 12 4C16.5 4 20 7 20 13Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <Rect x="9" y="13" width="6" height="7" rx="2" stroke={color} strokeWidth={1.6} />
    </Svg>
  );
}
