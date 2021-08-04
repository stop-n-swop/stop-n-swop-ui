/* eslint-disable react/jsx-no-literals */
import React from 'react';
import { Provider as Intl } from 'ui/intl';
import { en } from 'ui/messages';
import { Order, Status as OrderStatus } from '@sns/contracts/order';
import { Status as ActionStatus } from '@respite/core';
import { BrowserRouter } from 'react-router-dom';
import type { Listing } from '@sns/contracts/listing';
import Actions from '../Actions';
import Overview from './Overview';
import Help from '../Help';

export default {
  title: 'modules / listings / my / listing / Overview',
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
    price: 1000,
    postage: 200,
    currency: 'GBP',
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
        <Overview
          actions={
            <Actions
              onChangeStatus={alert}
              listing={listing}
              orders={orders}
              status={actionStatus}
            />
          }
          help={<Help status={orderStatus} />}
          buyer="buyer_id"
          listing={listing}
          listingId={listing.id}
          orderId={order.id}
          productId="product-id"
          status={order.status}
          buyerAddress={<div>buyer address</div>}
          history={<div>history</div>}
        />
      </BrowserRouter>
    </Intl>
  );
};
Basic.args = basicProps;
