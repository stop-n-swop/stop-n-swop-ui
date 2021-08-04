import React from 'react';
import Photo from 'ui/elements/Photo';

export default function Image({ image }: { image: string }) {
  return (
    <div
      className="w-1/2 sm:w-w/3 md:w-1/4 flex flex-shrink-0 flex-grow-0 relative"
      style={{ '--aspect-ratio': 16 / 9 } as any}
    >
      <Photo src={image} alt="preview" className="object-cover" />
    </div>
  );
}
