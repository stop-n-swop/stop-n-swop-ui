import React from 'react';
import { Route } from 'react-router-dom';
import { MY_LISTINGS, PRODUCT_LISTING } from 'ui/constants/paths';
import ListingPage from './Listing';
import NewListingPages from './New';
import MyListingsPage from './My';

export default function ProductsPage() {
  return (
    <>
      <Route path={PRODUCT_LISTING} exact>
        <ListingPage />
      </Route>
      <Route path={MY_LISTINGS} exact>
        <MyListingsPage />
      </Route>
      <NewListingPages />
    </>
  );
}
