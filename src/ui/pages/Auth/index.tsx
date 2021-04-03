import React from 'react';
import { Route } from 'react-router-dom';
import { LOGIN, REGISTER } from 'ui/constants/paths';
import Login from './Login';
import Register from './Register';

export default function AuthPages() {
  return (
    <>
      <Route path={LOGIN} exact>
        <Login />
      </Route>
      <Route path={REGISTER} exact>
        <Register />
      </Route>
    </>
  );
}
