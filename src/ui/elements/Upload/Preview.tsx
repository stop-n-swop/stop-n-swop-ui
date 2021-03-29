import { ImageUrl } from 'core/types';
import React, { useState } from 'react';
import PreviewOptions from './PreviewOptions';

export default function Preview({
  preview,
  onClear,
}: {
  preview: ImageUrl;
  onClear(): void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="preview"
        tabIndex={0}
        onMouseEnter={() => setHovered(true)}
        onClick={() => setHovered(true)}
        className="w-full h-full"
      >
        <img
          src={preview}
          alt={preview}
          className="object-contain w-full h-full"
          loading="lazy"
        />
      </button>
      <If condition={hovered}>
        <PreviewOptions onClear={onClear} onClose={() => setHovered(false)} />
      </If>
    </>
  );
}
