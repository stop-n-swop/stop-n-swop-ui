import type { ImageUrl } from 'domain/types';
import React from 'react';

export default function Banner({ image }: { image: ImageUrl }) {
  return (
    <img
      className="absolute w-full h-full object-center object-cover filter blur-sm brightness-50"
      src={image}
      alt={image}
      loading="lazy"
    />
  );
}
