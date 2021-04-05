import React from 'react';
import { Route } from 'react-router-dom';
import { MY_LISTINGS, VIEW_MY_LISTING } from 'ui/constants/paths';
import MyListingsPage from './Listings';
import MyListingPage from './Listing';

export default function ProductsPage() {
  return (
    <>
      <Route path={MY_LISTINGS} exact>
        <MyListingsPage />
      </Route>
      <Route path={VIEW_MY_LISTING} exact>
        <MyListingPage />
      </Route>
    </>
  );
}
