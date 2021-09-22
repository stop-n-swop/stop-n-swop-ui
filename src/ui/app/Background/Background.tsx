/* eslint-disable react/no-array-index-key */
import React, { memo, useMemo } from 'react';
import Cloud from './Cloud';
import Flowers from './Flowers';
import Grass from './Grass';
import Platform from './Platform';
import Sky from './Sky';
import Water from './Water';

const totalClouds = Math.round(Math.random() * 6);
const totalPlatforms = Math.round(Math.random() * 4);
const totalFlowers = Math.round(Math.random() * 6);

function Background() {
  const clouds = useMemo(() => {
    return new Array(totalClouds).fill(null).map((_, i) => <Cloud key={i} />);
  }, []);
  const platforms = useMemo(() => {
    return new Array(totalPlatforms)
      .fill(null)
      .map((_, i) => <Platform key={i} />);
  }, []);

  return (
    <div className="fixed w-full h-full flex flex-col">
      <Sky>
        {clouds}
        {platforms}
      </Sky>

      <Grass
        style={{
          position: 'absolute',
          bottom: 16 * 7,
          left: '75%',
        }}
        edges="all"
        width={12}
        height={6}
      />
      <div className="flex items-end">
        <div style={{ width: '25%' }}>
          <Flowers count={Math.round(totalFlowers / 2)} />
          <Grass edges="top-right" height={4} width="100%" />
          <Water edges="top" height={4} width="100%" />
        </div>
        <div style={{ width: '25%' }} className="flex flex-col justify-end">
          <Water edges="top" open height={4} width="100%" />
        </div>
        <div style={{ width: '50%' }}>
          <div className="w-1/2 mx-auto">
            <Flowers count={totalFlowers} />
          </div>
          <Grass edges="top-left" height={4} width="100%" />
          <Water edges="top" height={4} width="100%" />
        </div>
      </div>
    </div>
  );
}

export default memo(Background);
