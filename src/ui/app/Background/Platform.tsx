import React, { useMemo } from 'react';
import Grass from './Grass';

export default function Platform() {
  const { width, left, top } = useMemo(() => {
    const width = Math.round(Math.random() * 3) + 5;
    const left = Math.floor(Math.random() * 90);
    const top = Math.floor(Math.random() * 30) + 50;

    return { width, left, top };
  }, []);

  return (
    <Grass
      className="absolute"
      style={{
        left: `${left}%`,
        top: `${top}%`,
      }}
      edges="all"
      width={width}
      height={2}
    />
  );
}
