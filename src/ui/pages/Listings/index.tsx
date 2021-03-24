import React from 'react';
import { Route } from 'react-router-dom';
import { PRODUCT_LISTING } from 'ui/constants/paths';
import ListingPage from './Listing';

export default function ProductsPage() {
  return (
    <>
      <Route path={PRODUCT_LISTING} exact>
        <ListingPage />
      </Route>
    </>
  );
}
