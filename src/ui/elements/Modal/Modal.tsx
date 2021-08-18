import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';
import Card from 'ui/elements/Card';
import { FaTimes } from 'react-icons/fa';
import cx from 'classnames';

export default function Modal({
  isOpen = true,
  onClose,
  children,
  title,
}: {
  isOpen?: boolean;
  onClose?(): void;
  children: ReactNode;
  title: ReactNode;
}) {
  return (
    <ReactModal
      isOpen={isOpen}
      appElement={document.getElementById('modal-container')}
      overlayClassName="fixed inset-0 bg-black bg-opacity-20"
      className={cx(
        'absolute inset-0 outline-none max-h-full overflow-y-auto',
        'md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:transform',
      )}
      onRequestClose={onClose}
      style={{ content: { fontSize: 20 } }}
    >
      <Card
        glass={false}
        className="h-full border border-white overflow-y-auto flex flex-col flex-grow"
        innerClassName="flex-grow flex flex-col"
        title={
          onClose ? (
            <>
              {title}
              <button type="button" onClick={onClose} title="close">
                <FaTimes />
              </button>
            </>
          ) : (
            title
          )
        }
      >
        {children}
      </Card>
    </ReactModal>
  );
}
