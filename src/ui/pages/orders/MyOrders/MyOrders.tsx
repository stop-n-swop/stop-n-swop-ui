import React, { useState } from 'react';
import { useGetMessage } from 'ui/intl';
import { List } from 'ui/elements/list';
import PageTitle from 'ui/elements/PageTitle';
import { ids } from 'ui/messages';
import { useAuthGuard } from 'application/auth';
import { useMyOrders } from 'application/orders';
import Card from 'ui/elements/Card';
import { sortBy } from 'crosscutting/utils';
import Toggle from 'ui/elements/Toggle';
import { isOrderComplete } from 'domain/selectors/orders';
import Order from './Order';

export default function MyOrders() {
  useAuthGuard();
  const getMessage = useGetMessage();

  const { data: allOrders } = useMyOrders();
  const activeOrders = allOrders.filter((order) => {
    return !isOrderComplete(order);
  });
  const hasInactive = activeOrders.length !== allOrders.length;
  const [showAll, setShowAll] = useState(
    () => hasInactive && activeOrders.length === 0,
  );
  const orders = showAll ? allOrders : activeOrders;

  return (
    <div>
      <PageTitle>{getMessage(ids.order.myOrders.title)}</PageTitle>
      <div className="container mx-auto space-y-4 sm:py-4 lg:pt-0">
        <div className="flex justify-between md:justify-end p-4 md:space-x-8 bg-black md:bg-transparent">
          <If condition={hasInactive}>
            <div className="flex items-center bg-black p-4 rounded bg-opacity-50">
              <Toggle
                label={getMessage(ids.order.myOrders.showAll)}
                value={showAll}
                onChange={setShowAll}
              />
            </div>
          </If>
        </div>
        <Choose>
          <When condition={orders.length === 0}>
            <Card>
              <p>{getMessage(ids.order.myOrders.empty)}</p>
            </Card>
          </When>
          <Otherwise>
            <List className="space-y-2 sm:space-y-4 lg:space-y-8">
              {sortBy(orders, (order) => order.created, false).map((order) => (
                <Order key={order.id} order={order} />
              ))}
            </List>
          </Otherwise>
        </Choose>
      </div>
    </div>
  );
}
