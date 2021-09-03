import React, { useMemo } from 'react';
import flower1 from 'ui/assets/tiles/flower_01.png';
import flower2 from 'ui/assets/tiles/flower_02.png';
import flower3 from 'ui/assets/tiles/flower_03.png';
import flower4 from 'ui/assets/tiles/flower_04.png';

export default function Flower() {
  const flower = useMemo(() => {
    const flowers = [flower1, flower2, flower3, flower4];
    const i = Math.floor(Math.random() * 4);
    return flowers[i];
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${flower})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: 11,
        height: 15,
      }}
    />
  );
}
