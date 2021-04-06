import React from 'react';
import { Route } from 'react-router-dom';
import { MY_ORDERS } from 'ui/constants/paths';
import MyOrdersPage from './My';

export default function OrdersPage() {
  return (
    <>
      <Route path={MY_ORDERS} exact>
        <MyOrdersPage />
      </Route>
    </>
  );
}
