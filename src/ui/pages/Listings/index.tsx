import React from 'react';
import { Route } from 'react-router-dom';
import { NEW_LISTING, PRODUCT_LISTING } from 'ui/constants/paths';
import ListingPage from './Listing';
import NewListingPage from './NewListing';

export default function ProductsPage() {
  return (
    <>
      <Route path={PRODUCT_LISTING} exact>
        <ListingPage />
      </Route>
      <Route path={NEW_LISTING} exact>
        <NewListingPage />
      </Route>
    </>
  );
}
