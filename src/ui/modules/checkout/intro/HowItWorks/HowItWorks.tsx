import React, { useState } from 'react';
import Button from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Modal from 'ui/elements/Modal';
import Help from 'ui/help/checkout/intro/howItWorks.mdx';

export default function HowItWorks() {
  const getMessage = useGetMessage();
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-4">
      <Button
        className="text-sm"
        kind="tertiary"
        padding={false}
        onClick={() => setShow(true)}
      >
        {getMessage(ids.checkout.intro.howItWorks.button)}
      </Button>
      <Modal
        isOpen={show}
        onClose={() => setShow(false)}
        title={getMessage(ids.checkout.intro.howItWorks.button)}
      >
        <div className="help">
          <Help />
        </div>
      </Modal>
    </div>
  );
}
