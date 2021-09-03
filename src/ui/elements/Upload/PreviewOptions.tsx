import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useMessage } from 'ui/intl';
import Button from 'ui/elements/Button';
import { ids } from 'ui/messages';

export default function PreviewOptions({
  onClear,
  onClose,
}: {
  onClear(): void;
  onClose(): void;
}) {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 flex flex-col items-center justify-around"
      onMouseLeave={onClose}
    >
      <Button
        className="w-3/4 sm:w-2/3 xl:w-1/2"
        kind="primary"
        onClick={() => {
          setTimeout(() => {
            onClear();
            onClose();
          }, 0);
        }}
      >
        <span className="xl:hidden">
          <FaTimes />
        </span>
        <span className="pl-4 xl:pl-0">
          {useMessage(ids.elements.upload.remove)}
        </span>
      </Button>
      <Button
        className="w-3/4 sm:w-2/3 xl:w-1/2 xl:hidden"
        kind="secondary"
        onClick={onClose}
      >
        {useMessage(ids.elements.upload.close)}
      </Button>
    </div>
  );
}
