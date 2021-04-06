import { Status } from 'core/constants/order';
import { Order } from 'core/entity/orders';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { List } from 'ui/elements/list';
import PageTitle from 'ui/elements/PageTitle';
import { ids } from 'ui/messages';
import MyOrder from './MyOrder';

const orders: Order[] = [
  {
    listingId: 'b',
    username: 'buyer1',
    status: Status.SOLD,
  },
  {
    listingId: 'c',
    username: 'buyer1',
    status: Status.POSTED,
  },
];

export default function MyOrders() {
  return (
    <div>
      <PageTitle>
        <FormattedMessage id={ids.order.title} />
      </PageTitle>
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
