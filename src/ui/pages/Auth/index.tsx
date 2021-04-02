import React from 'react';
import { Route } from 'react-router-dom';
import { LOGIN } from 'ui/constants/paths';
import Login from './Login';

export default function AuthPages() {
  return (
    <Route path={LOGIN}>
      <Login />
    </Route>
  );
}
