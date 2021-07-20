import React from 'react';
import { Order, Status as OrderStatus } from '@sns/contracts/order';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import ActionButton from 'ui/modules/listings/my/listing/Actions/ActionButton';

import Modal from 'ui/elements/Modal';
import type { Status } from '@respite/core';

interface Props {
  order: Order;
  status: Status;
  active: OrderStatus;
  isOpen: boolean;
  onClose(): void;
  onClick(args: { status: OrderStatus }): void;
}

export default function ReceivedModal({
  active,
  order,
  status,
  onClick,
  isOpen,
  onClose,
}: Props) {
  const isActive = (status: OrderStatus) => {
    return status === active;
  };
  const getMessage = useGetMessage();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Received">
      <div className="max-w-screen-sm w-screen mx-auto space-y-12">
        <div className="space-y-4">
          <p>{getMessage(ids.order.myOrder.receivedModal.title)}</p>
          <p>{getMessage(ids.order.myOrder.receivedModal.subtitle)}</p>
        </div>
        <div className="flex flex-col md:flex-row justify-around">
          <ActionButton
            orderId={order.id}
            action={OrderStatus.RECEIVED}
            active={isActive(OrderStatus.RECEIVED)}
            status={status}
            onClick={onClick}
          />
          <ActionButton
            orderId={order.id}
            action={OrderStatus.DISPUTED}
            active={isActive(OrderStatus.DISPUTED)}
            status={status}
            onClick={onClick}
          />
        </div>
      </div>
    </Modal>
  );
}
