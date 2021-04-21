import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { DASHBOARD } from 'ui/constants/paths';

const Dashboard = lazy(() => import('./Dashboard'));

export default function AccountPages() {
  return (
    <>
      <Route path={DASHBOARD}>
        <Dashboard />
      </Route>
    </>
  );
}
