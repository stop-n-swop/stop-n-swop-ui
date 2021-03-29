import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';
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
      className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 flex flex-col items-center justify-around"
      onMouseLeave={onClose}
    >
      <Button
        className="w-1/2"
        kind="primary"
        state="error"
        onClick={() => {
          setTimeout(() => {
            onClear();
            onClose();
          }, 0);
        }}
      >
        <FaTimes />
        <span className="pl-4">
          <FormattedMessage id={ids.elements.upload.remove} />
        </span>
      </Button>
      <Button className="w-1/2 xl:hidden" kind="secondary" onClick={onClose}>
        <FormattedMessage id={ids.elements.upload.close} />
      </Button>
    </div>
  );
}
