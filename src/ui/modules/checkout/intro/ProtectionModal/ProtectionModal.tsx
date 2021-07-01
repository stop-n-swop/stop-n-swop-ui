import React from 'react';
import Modal from 'ui/elements/Modal';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Help from 'ui/help/checkout/intro/protection.mdx';

export default function ProtectionModal({
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
      title={getMessage(ids.checkout.intro.protectionGuide.title)}
      onClose={onClose}
    >
      <div className="help">
        <Help />
      </div>
    </Modal>
  );
}
