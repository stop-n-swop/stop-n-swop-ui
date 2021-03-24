import React from 'react';
import { Route } from 'react-router-dom';
import { PRODUCT, PRODUCTS } from 'ui/constants/paths';
import BrowsePage from './Browse';
import ViewPage from './View';

export default function ProductsPage() {
  return (
    <>
      <Route path={PRODUCTS} exact>
        <BrowsePage />
      </Route>
      <Route path={PRODUCT} exact>
        <ViewPage />
      </Route>
    </>
  );
}
