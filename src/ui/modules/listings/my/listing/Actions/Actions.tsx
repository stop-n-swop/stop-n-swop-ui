import React, { useState } from 'react';
import { Order, Status } from '@sns/contracts/order';
import Button from 'ui/elements/Button';
import { Link } from 'react-router-dom';
import { makeEditListingPath } from 'ui/constants/paths';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { FaPen } from 'react-icons/fa';
import type { Status as RStatus } from '@respite/core';
import type { Listing } from '@sns/contracts/listing';
import ActionButton from './ActionButton';
import MultiOrders from './MultiOrders';

interface Props {
  listing: Listing;
  orders: Order[];
  status: RStatus;
  onChangeStatus(args: { orderId: string; status: Status }): void;
}

export default function Actions({
  listing,
  orders,
  status,
  onChangeStatus,
}: Props) {
  const [active, setActive] = useState<{ orderId: string; status: Status }>({
    orderId: '',
    status: Status.OPEN,
  });
  const handleClick = (args: { orderId: string; status: Status }) => {
    setActive(args);
    onChangeStatus(args);
  };
  const isActive = (orderId: string, status: Status) => {
    return orderId === active.orderId && status === active.status;
  };
  const getMessage = useGetMessage();

  const { id: listingId } = listing;

  if (listing.status === Status.OPEN) {
    return (
      <div className="md:flex md:space-x-4 lg:space-x-8">
        <ActionButton
          orderId=""
          action={Status.CLOSED}
          active={isActive('', Status.CLOSED)}
          status={status}
          onClick={handleClick}
        />
      </div>
    );
  }
  if (listing.status === Status.CLOSED) {
    return (
      <div className="md:flex md:space-x-4 lg:space-x-8">
        <ActionButton
          orderId=""
          action={Status.OPEN}
          active={isActive('', Status.OPEN)}
          status={status}
          onClick={handleClick}
        />
        <Button
          className="w-full lg:w-auto space-x-4"
          component={Link}
          to={makeEditListingPath({ listingId })}
          kind="secondary"
        >
          <span>
            <FaPen />
          </span>
          <span>{getMessage(ids.order.actions.edit)}</span>
        </Button>
      </div>
    );
  }
  if (listing.status === Status.PLACED && orders.length > 1) {
    return (
      <MultiOrders
        active={active}
        onChangeStatus={handleClick}
        orders={orders}
        status={status}
      />
    );
  }
  const [order] = orders;

  if (order == null || order.status !== listing.status) {
    return null;
  }

  if (listing.status === Status.PLACED) {
    return (
      <div className="block md:flex md:space-x-4 lg:space-x-8">
        <ActionButton
          orderId={order.id}
          action={Status.APPROVED}
          active={isActive(order.id, Status.APPROVED)}
          status={status}
          onClick={handleClick}
        />
        <ActionButton
          orderId={order.id}
          action={Status.DECLINED}
          active={isActive(order.id, Status.DECLINED)}
          status={status}
          onClick={handleClick}
        />
        <ActionButton
          orderId={order.id}
          action={Status.CLOSED}
          active={isActive(order.id, Status.CLOSED)}
          status={status}
          onClick={handleClick}
        />
      </div>
    );
  }

  if (listing.status === Status.APPROVED) {
    return (
      <div className="md:flex md:space-x-4 lg:space-x-8">
        <ActionButton
          orderId={order.id}
          action={Status.POSTED}
          active={isActive(order.id, Status.POSTED)}
          status={status}
          onClick={handleClick}
        />
        <div className="w-full" />
      </div>
    );
  }
  return null;
}
