import { useUser } from 'application/user';
import React from 'react';
import Dash from 'ui/modules/home/existing/Dash';
import Screen from 'ui/modules/home/existing/Screen';
import BalancePanel from './panels/Balance';
import ListingsPanel from './panels/Listings';
import OrdersPanel from './panels/Orders';
import Popular from './Popular';
import RecentlyAdded from './RecentlyAdded';
import Suggested from './Suggested';

export default function ExistingHome() {
  const {
    data: { email, username },
  } = useUser();

  return (
    <Screen
      dash={
        <Dash username={username ?? email}>
          <ListingsPanel />
          <OrdersPanel />
          <BalancePanel />
        </Dash>
      }
      popular={<Popular />}
      recentlyAdded={<RecentlyAdded />}
      suggested={<Suggested />}
    />
  );
}
