import React, { useState } from 'react';
import { Order, Status as OrderStatus } from '@sns/contracts/order';
import Button from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import ActionButton from 'ui/modules/listings/my/listings/Actions/ActionButton';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import type { Status } from '@respite/core';

interface Props {
  order: Order;
  status: Status;
  onClick(status: OrderStatus): void;
}

export default function Actions({ order, status, onClick }: Props) {
  const [active, setActive] = useState<OrderStatus>();
  const handleClick = ({ status }: { status: OrderStatus }) => {
    setActive(status);
    onClick(status);
  };
  const isActive = (status: OrderStatus) => {
    return status === active;
  };
  const getMessage = useGetMessage();

  if (order.status === OrderStatus.PLACED) {
    return (
      <div className="md:flex md:space-x-4 lg:space-x-8">
        <ActionButton
          orderId={order.id}
          action={OrderStatus.CANCELLED}
          active={isActive(OrderStatus.CANCELLED)}
          status={status}
          onClick={handleClick}
        />
        <div />
      </div>
    );
  }
  if (order.status === OrderStatus.POSTED) {
    return (
      <div className="md:flex md:space-x-4 lg:space-x-8">
        <ActionButton
          orderId={order.id}
          action={OrderStatus.RECEIVED}
          active={isActive(OrderStatus.RECEIVED)}
          status={status}
          onClick={handleClick}
        />
      </div>
    );
  }
  if (order.status === OrderStatus.RECEIVED) {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold">
          {getMessage(ids.order.actions.feedback)}
        </h3>
        <div className="md:flex md:space-x-4 lg:space-x-8">
          <Button kind="primary">
            <FaThumbsUp />
          </Button>
          <Button kind="secondary">
            <FaThumbsDown />
          </Button>
        </div>
      </div>
    );
  }
  return null;
}
