import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { LEVEL_UP_ADDRESS, LEVEL_UP_USERNAME } from 'ui/constants/paths';
import Address from './Address';

const Username = lazy(() => import('./Username'));

export default function LevelUpPages() {
  return (
    <>
      <Route path={LEVEL_UP_USERNAME} exact>
        <Username />
      </Route>
      <Route path={LEVEL_UP_ADDRESS} exact>
        <Address />
      </Route>
    </>
  );
}
