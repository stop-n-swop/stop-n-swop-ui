import React from 'react';
import { useGetMessage } from 'ui/intl';
import { List } from 'ui/elements/list';
import PageTitle from 'ui/elements/PageTitle';
import { ids } from 'ui/messages';
import { useAuthGuard } from 'application/auth';
import { useMyOrders } from 'application/orders';
import Card from 'ui/elements/Card';
import { sortBy } from 'crosscutting/utils';
import Order from './Order';

export default function MyOrders() {
  useAuthGuard();
  const getMessage = useGetMessage();

  const { data: orders } = useMyOrders();

  return (
    <div>
      <PageTitle>{getMessage(ids.order.myOrders.title)}</PageTitle>
      <div className="xl:w-4/5 xl:mx-auto mt-6">
        <Choose>
          <When condition={orders.length === 0}>
            <Card>
              <p>{getMessage(ids.order.myOrders.empty)}</p>
            </Card>
          </When>
          <Otherwise>
            <List>
              {sortBy(orders, (order) => order.created, false).map((order) => (
                <Order order={order} />
              ))}
            </List>
          </Otherwise>
        </Choose>
      </div>
    </div>
  );
}
