import React from 'react';
import { Route } from 'react-router-dom';
import { NEW_LISTING, PRODUCT_NEW_LISTING } from 'ui/constants/paths';
import NewListing from './NewListing';
import NewProductListingPage from './NewProductListing';

export default function NewListingPages() {
  return (
    <>
      <Route path={NEW_LISTING} exact>
        <NewListing />
      </Route>
      <Route path={PRODUCT_NEW_LISTING} exact>
        <NewProductListingPage />
      </Route>
    </>
  );
}
