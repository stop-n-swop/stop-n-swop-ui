import React from 'react';
import { Provider as Intl } from 'ui/intl';
import { en } from 'ui/messages';
import { Order, Status as OrderStatus } from '@sns/contracts/order';
import { Status as ActionStatus } from '@respite/core';
import { BrowserRouter } from 'react-router-dom';
import type { Listing } from '@sns/contracts/listing';
import Actions from './Actions';

export default {
  title: 'modules / listings / my / listing / Actions',
  argTypes: {
    orderStatus: {
      control: 'select',
      options: Object.values(OrderStatus),
    },
    actionStatus: {
      control: 'select',
      options: Object.values(ActionStatus),
    },
  },
};

interface BasicProps {
  orderStatus: OrderStatus;
  actionStatus: ActionStatus;
  multiple: boolean;
}
const basicProps: BasicProps = {
  orderStatus: OrderStatus.OPEN,
  actionStatus: ActionStatus.IDLE,
  multiple: false,
};

export const Basic = ({ orderStatus, actionStatus, multiple }: BasicProps) => {
  const listing: Listing = {
    id: 'listing-id',
    status: orderStatus,
  } as Listing;
  const order: Order = {
    id: 'order-id',
    listingId: listing.id,
    status: orderStatus,
  } as Order;
  const orders = [order];
  if (multiple) {
    orders.push(order);
  }

  return (
    <Intl messages={en}>
      <BrowserRouter>
        <Actions
          onChangeStatus={alert}
          listing={listing}
          orders={orders}
          status={actionStatus}
        />
      </BrowserRouter>
    </Intl>
  );
};
Basic.args = basicProps;
