import { useMyOrders } from 'application/orders';
import { doesOrderHaveActions, isOrderComplete } from 'domain/selectors/orders';
import React from 'react';
import { makeMyOrderPath, MY_ORDERS } from 'ui/constants/paths';
import { LinkButton } from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Panel from 'ui/modules/home/existing/Panel';

export default function OrdersPanel() {
  const { data: allOrders } = useMyOrders();
  const g = useGetMessage();

  if (allOrders.length === 0) {
    return null;
  }

  const activeCount = allOrders.filter((order) => {
    return !isOrderComplete(order);
  }).length;
  const actionCount = allOrders.filter((order) => {
    return doesOrderHaveActions(order);
  }).length;
  const actionOrderId = allOrders.find((order) =>
    doesOrderHaveActions(order),
  )?.id;

  return (
    <Panel
      title={g(ids.home.existing.orders.title)}
      ctas={
        <LinkButton kind="primary" padding to={MY_ORDERS}>
          {g(ids.home.existing.orders.cta)}
        </LinkButton>
      }
    >
      <div>{g(ids.home.existing.orders.active, { count: activeCount })}</div>
      <div>
        <Choose>
          <When condition={actionCount === 1}>
            <LinkButton
              kind="tertiary"
              to={makeMyOrderPath({ orderId: actionOrderId })}
            >
              {g(ids.home.existing.orders.action, { count: actionCount })}
            </LinkButton>
          </When>
          <When condition={actionCount > 1}>
            <LinkButton kind="tertiary" to={MY_ORDERS}>
              {g(ids.home.existing.orders.action, { count: actionCount })}
            </LinkButton>
          </When>
        </Choose>
      </div>
    </Panel>
  );
}
