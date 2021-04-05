import React from 'react';

export default function Image({ image }: { image: string }) {
  return (
    <div
      className="w-1/2 sm:w-w/3 md:w-1/4 flex flex-shrink-0 flex-grow-0 relative"
      style={{ '--aspect-ratio': 16 / 9 } as any}
    >
      <img
        src={image}
        alt="preview"
        className="object-contain"
        loading="lazy"
      />
    </div>
  );
}
