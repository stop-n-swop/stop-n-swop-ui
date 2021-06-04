import { Status, Order } from '@sns/contracts/order';
import React from 'react';
import { useMessage } from 'ui/intl';
import { List } from 'ui/elements/list';
import PageTitle from 'ui/elements/PageTitle';
import { ids } from 'ui/messages';
import { useAuthGuard } from 'application/auth';
import MyOrder from './MyOrder';

const orders: Order[] = [
  {
    id: '',
    listingId: 'b',
    username: 'buyer1',
    status: Status.OPEN,
  },
  {
    id: '',
    listingId: 'c',
    username: 'buyer1',
    status: Status.POSTED,
  },
];

export default function MyOrders() {
  useAuthGuard();

  return (
    <div>
      <PageTitle>{useMessage(ids.order.title)}</PageTitle>
      <div className="xl:w-4/5 xl:mx-auto mt-6">
        <List>
          {orders.map((order) => (
            <MyOrder order={order} />
          ))}
        </List>
      </div>
    </div>
  );
}
