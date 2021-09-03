import React, { useMemo } from 'react';
import Flower from './Flower';

interface Props {
  count: number;
}

export default function Flowers({ count }: Props) {
  const flowers = useMemo(() => {
    const maxMarginPerc = 50 / count;
    return new Array(count).fill(null).map(() => {
      const marginLeft = `${Math.round(Math.random() * maxMarginPerc)}%`;
      const marginRight = `${Math.round(Math.random() * maxMarginPerc)}%`;

      return (
        <div
          style={{
            marginLeft,
            marginRight,
          }}
        >
          <Flower />
        </div>
      );
    });
  }, [count]);
  return (
    <div className="relative">
      <div className="absolute w-full bottom-0 flex">{flowers}</div>
    </div>
  );
}
