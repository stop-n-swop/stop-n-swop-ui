import { useUser } from 'application/user';
import React, { Suspense } from 'react';
import Dash from 'ui/modules/home/existing/Dash';
import Screen from 'ui/modules/home/existing/Screen';
import Search from 'ui/modules/home/new/Search';
import BalancePanel from './panels/Balance';
import ListingsPanel from './panels/Listings';
import NewUserPanel from './panels/NewUser';
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
          <Suspense fallback={null}>
            <NewUserPanel />
          </Suspense>
          <Suspense fallback={null}>
            <ListingsPanel />
          </Suspense>
          <Suspense fallback={null}>
            <OrdersPanel />
          </Suspense>
          <Suspense fallback={null}>
            <BalancePanel />
          </Suspense>
        </Dash>
      }
      search={<Search />}
      popular={
        <Suspense fallback={null}>
          <Popular />
        </Suspense>
      }
      recentlyAdded={
        <Suspense fallback={null}>
          <RecentlyAdded />
        </Suspense>
      }
      suggested={
        <Suspense fallback={null}>
          <Suggested />
        </Suspense>
      }
    />
  );
}
