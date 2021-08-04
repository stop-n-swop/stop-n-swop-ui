import React, { useState } from 'react';
import { Order, Status as OrderStatus } from '@sns/contracts/order';
import Button, { LinkButton } from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import ActionButton from 'ui/modules/listings/my/listing/Actions/ActionButton';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  makeCheckoutPaymentPath,
  makeCheckoutProcessingPath,
  makeContinueCheckoutPath,
} from 'ui/constants/paths';
import type { Status } from '@respite/core';
import ReceivedModal from './ReceivedModal';

interface Props {
  order: Order;
  status: Status;
  onClick(status: OrderStatus): void;
}

export default function Actions({ order, status, onClick }: Props) {
  const [active, setActive] = useState<OrderStatus>();
  const [receivedModal, setReceivedModal] = useState(false);
  const handleClick = ({ status }: { status: OrderStatus }) => {
    setActive(status);
    onClick(status);
  };
  const isActive = (status: OrderStatus) => {
    return status === active;
  };
  const getMessage = useGetMessage();

  if (
    order.status === OrderStatus.CREATED ||
    order.status === OrderStatus.PENDING
  ) {
    return (
      <div className="md:flex md:space-x-4 lg:space-x-8">
        <Button
          className="w-full lg:w-auto space-x-4"
          component={Link}
          to={makeContinueCheckoutPath({ orderId: order.id })}
          kind="primary"
        >
          <span>
            <FaShoppingCart />
          </span>
          <span>{getMessage(ids.order.actions.pending)}</span>
        </Button>
        <ActionButton
          orderId={order.id}
          action={OrderStatus.CANCELLED}
          active={isActive(OrderStatus.CANCELLED)}
          status={status}
          onClick={handleClick}
        />
      </div>
    );
  }

  if (order.status === OrderStatus.NOT_PAID) {
    return (
      <div className="md:flex md:space-x-4 lg:space-x-8">
        <Button
          className="w-full lg:w-auto space-x-4"
          component={Link}
          to={makeCheckoutPaymentPath({ orderId: order.id })}
          kind="primary"
        >
          <span>{getMessage(ids.order.actions.notPaid)}</span>
        </Button>
        <ActionButton
          orderId={order.id}
          action={OrderStatus.CANCELLED}
          active={isActive(OrderStatus.CANCELLED)}
          status={status}
          onClick={handleClick}
        />
      </div>
    );
  }

  if (order.status === OrderStatus.PAYING) {
    return (
      <div className="md:flex md:space-x-4 lg:space-x-8">
        <LinkButton
          className="w-full lg:w-auto space-x-4"
          to={makeCheckoutProcessingPath({ orderId: order.id })}
          kind="primary"
        >
          <span>
            <FaShoppingCart />
          </span>
          <span>{getMessage(ids.order.actions.pending)}</span>
        </LinkButton>
      </div>
    );
  }

  if (order.status === OrderStatus.POSTED) {
    return (
      <div className="md:flex justify-center md:space-x-4 lg:space-x-8">
        <Button kind="primary" onClick={() => setReceivedModal(true)}>
          {getMessage(ids.order.myOrder.receivedModal.trigger)}
        </Button>
        <Button
          kind="secondary"
          state="disabled"
          title="Please allow up to 7 days for your order to arrive"
        >
          {getMessage(ids.order.actions.notReceived)}
        </Button>
        <ReceivedModal
          active={active}
          isOpen={receivedModal}
          onClick={handleClick}
          onClose={() => setReceivedModal(false)}
          order={order}
          status={status}
        />
      </div>
    );
  }
  if (order.status === OrderStatus.NOT_RECEIVED) {
    return (
      <div className="md:flex md:space-x-4 lg:space-x-8">
        <Button kind="primary" onClick={() => setReceivedModal(true)}>
          {getMessage(ids.order.myOrder.receivedModal.trigger)}
        </Button>
        <ReceivedModal
          active={active}
          isOpen={receivedModal}
          onClick={handleClick}
          onClose={() => setReceivedModal(false)}
          order={order}
          status={status}
        />
      </div>
    );
  }
  return null;
}
