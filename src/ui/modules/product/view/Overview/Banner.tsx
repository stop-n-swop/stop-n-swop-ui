import { ImageUrl } from 'core/types';
import React from 'react';

export default function Banner({ image }: { image: ImageUrl }) {
  return (
    <img
      className="absolute w-full h-full object-center object-cover"
      src={image}
      alt={image}
      style={{
        filter: 'blur(3px) brightness(0.5)',
      }}
      loading="lazy"
    />
  );
}
