import React from 'react';
import { Route } from 'react-router-dom';
import { HOME } from 'ui/constants/paths';
import HomePage from './Home';
import ProductPages from './Products';
import ListingPages from './Listings';
import AuthPages from './Auth';
import OrdersPages from './Orders';

export default function Pages() {
  return (
    <>
      <Route path={HOME} exact>
        <HomePage />
      </Route>
      <ProductPages />
      <ListingPages />
      <AuthPages />
      <OrdersPages />
    </>
  );
}
