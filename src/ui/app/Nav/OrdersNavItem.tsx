import React from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { MY_ORDERS } from 'ui/constants/paths';
import NavItem from './NavItem';
import type { useMyOrders } from 'application/orders';

interface Props {
  loggedIn: boolean;
  close(): void;
  myOrdersQuery: ReturnType<typeof useMyOrders>;
}

export default function OrdersNavItem({
  loggedIn,
  close,
  myOrdersQuery,
}: Props) {
  const getMessage = useGetMessage();

  if (!loggedIn || !myOrdersQuery.data.length) {
    return null;
  }

  return (
    <NavItem to={MY_ORDERS} Icon={FaShippingFast} onClose={close}>
      {getMessage(ids.nav.orders)}
    </NavItem>
  );
}
