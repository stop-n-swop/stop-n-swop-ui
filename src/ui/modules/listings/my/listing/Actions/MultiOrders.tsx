import React from 'react';
import { Order, Status } from '@sns/contracts/order';
import { useGetMessage } from 'ui/intl';
import { List } from 'ui/elements/list';
import { sortBy } from 'crosscutting/utils';
import { ids } from 'ui/messages';
import type { Status as RStatus } from '@respite/core';
import ActionButton from './ActionButton';
import MultiOrder from './MultiOrder';

interface Props {
  orders: Order[];
  status: RStatus;
  onChangeStatus(args: { orderId: string; status: Status }): void;
  active: { orderId: string; status: Status };
}

export default function MultiOrders({
  orders,
  status,
  onChangeStatus,
  active,
}: Props) {
  const isActive = (orderId: string, status: Status) => {
    return orderId === active.orderId && status === active.status;
  };
  const getMessage = useGetMessage();

  return (
    <div className="space-y-4">
      <p>{getMessage(ids.listings.myListing.multiOrders.title)}</p>
      <List>
        {sortBy(orders, (order) => order.created).map((order) => (
          <MultiOrder
            key={order.id}
            active={active}
            onChangeStatus={onChangeStatus}
            order={order}
            status={status}
          />
        ))}
      </List>
      <div className="block md:flex md:space-x-4 lg:space-x-8">
        <ActionButton
          orderId=""
          action={Status.CLOSED}
          active={isActive('', Status.CLOSED)}
          status={status}
          onClick={onChangeStatus}
        />
      </div>
    </div>
  );
}
