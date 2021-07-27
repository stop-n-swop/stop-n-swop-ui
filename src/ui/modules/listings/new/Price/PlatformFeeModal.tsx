import React from 'react';
import Modal from 'ui/elements/Modal';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Help from 'ui/help/listings/platformFee.mdx';

export default function PlatformFeeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose(): void;
}) {
  const getMessage = useGetMessage();

  return (
    <Modal
      isOpen={isOpen}
      title={getMessage(ids.listings.new.price.platformFee.title)}
      onClose={onClose}
    >
      <div className="help">
        <Help />
      </div>
    </Modal>
  );
}
