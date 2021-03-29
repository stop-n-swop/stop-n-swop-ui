import React from 'react';
import cx from 'classnames';
import { ImageUrl } from 'core/types';

export default function Cover({ image }: { image: ImageUrl }) {
  return (
    <div
      className={cx(
        'w-1/2 border-white border-2 absolute top-4 left-4',
        'sm:w-1/3 sm:left-16 sm:top-1/2 sm:-translate-y-1/2 transform',
        'md:w-1/2 md:left-8',
        'lg:w-1/3 lg:left-1/3 lg:-translate-x-1/2',
        'xl:w-1/4',
      )}
      style={
        {
          '--aspect-ratio': 16 / 9,
        } as any
      }
    >
      <img
        src={image}
        alt={image}
        loading="lazy"
        className="object-cover object-center"
      />
    </div>
  );
}
