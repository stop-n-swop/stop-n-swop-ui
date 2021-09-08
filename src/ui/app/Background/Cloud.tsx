import React, { CSSProperties, useState } from 'react';
import cloud from 'ui/assets/tiles/cloud1.png';

interface Props {
  style?: CSSProperties;
}

export default function Cloud({ style }: Props) {
  const [{ height, left, top, transform, width }] = useState(() => {
    const sizeSeed = Math.max(Math.random() * 5, 0.5);
    const leftSeed = Math.round(Math.random() * 90);
    const topSeed = Math.round(Math.random() * 60);
    const transformSeed = Math.random() > 0.5;

    return {
      width: Math.round(32 * sizeSeed),
      height: Math.round(32 * sizeSeed),
      left: `${leftSeed}%`,
      top: `${topSeed}%`,
      transform: transformSeed ? 'scaleX(-1)' : null,
    };
  });

  return (
    <div
      style={{
        position: 'absolute',
        backgroundImage: `url(${cloud})`,
        backgroundSize: 'contain',
        width,
        height,
        left,
        top,
        transform,
        ...style,
      }}
    />
  );
}
