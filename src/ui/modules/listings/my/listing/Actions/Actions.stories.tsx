import React from 'react';
import { Provider as Intl } from 'ui/intl';
import { en } from 'ui/messages';
import { Order, Status as OrderStatus } from '@sns/contracts/order';
import { Status as ActionStatus } from '@respite/core';
import { BrowserRouter } from 'react-router-dom';
import type { Listing } from '@sns/contracts/listing';
import Actions from './Actions';
import type { User } from '@sns/contracts/user';

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
  manualApprove: boolean;
}
const basicProps: BasicProps = {
  orderStatus: OrderStatus.OPEN,
  actionStatus: ActionStatus.IDLE,
  multiple: false,
  manualApprove: false,
};

export const Basic = ({
  orderStatus,
  actionStatus,
  multiple,
  manualApprove,
}: BasicProps) => {
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
  const user: User = {
    username: 'stoppy',
    address: null,
    clientEmail: 'stop@swop.com',
    email: 'stop@swop.com',
    verified: true,
    preferences: {
      manualApproval: manualApprove,
      noticeEmails: false,
    },
    created: new Date(),
  };

  return (
    <Intl messages={en}>
      <BrowserRouter>
        <Actions
          onChangeStatus={alert}
          listing={listing}
          orders={orders}
          status={actionStatus}
          user={user}
        />
      </BrowserRouter>
    </Intl>
  );
};
Basic.args = basicProps;
