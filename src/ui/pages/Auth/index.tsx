import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { LOGIN, LOGOUT } from 'ui/constants/paths';
import LevelUpPages from './LevelUp';

const Login = lazy(() => import('./Login'));
const Logout = lazy(() => import('./Logout'));

export default function AuthPages() {
  return (
    <>
      <Route path={LOGIN} exact>
        <Login />
      </Route>
      <Route path={LOGOUT}>
        <Logout />
      </Route>
      <LevelUpPages />
    </>
  );
}
