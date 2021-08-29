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
import { Status } from '@sns/contracts/order';
import Order from './Order';

export default function MyOrders() {
  useAuthGuard();
  const getMessage = useGetMessage();

  const { data: allOrders } = useMyOrders();
  const activeOrders = allOrders.filter((order) => {
    return (
      [Status.CANCELLED, Status.COMPLETE, Status.DECLINED].includes(
        order.status,
      ) === false
    );
  });
  const hasInactive = activeOrders.length !== allOrders.length;
  const [showAll, setShowAll] = useState(
    () => hasInactive && activeOrders.length === 0,
  );
  const orders = showAll ? allOrders : activeOrders;

  return (
    <div>
      <PageTitle>{getMessage(ids.order.myOrders.title)}</PageTitle>
      <div className="mt-6 container mx-auto">
        <If condition={hasInactive}>
          <div className="flex justify-end my-6">
            <Toggle
              label={getMessage(ids.order.myOrders.showAll)}
              value={showAll}
              onChange={setShowAll}
            />
          </div>
        </If>
        <Choose>
          <When condition={orders.length === 0}>
            <Card>
              <p>{getMessage(ids.order.myOrders.empty)}</p>
            </Card>
          </When>
          <Otherwise>
            <List>
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
