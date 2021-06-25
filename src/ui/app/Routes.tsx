import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import {
  CHECKOUT,
  DASHBOARD,
  EDIT_LISTING,
  GAME,
  GAMES,
  GAME_LISTING,
  GAME_NEW_LISTING,
  HOME,
  LEVEL_UP_ADDRESS,
  LEVEL_UP_USERNAME,
  LOGIN,
  LOGOUT,
  MY_LISTINGS,
  MY_ORDER,
  MY_ORDERS,
  NEW_LISTING,
  NEW_LISTING_PLATFORM,
  MY_LISTING,
  BILLING_ADDRESS,
  DELIVERY_ADDRESS,
} from 'ui/constants/paths';
import Home from 'ui/pages/Home';

// Account
const Dashboard = lazy(() => import('ui/pages/account/Dashboard'));
const LevelUpUsername = lazy(() => import('ui/pages/account/LevelUpUsername'));
const LevelUpAddress = lazy(() => import('ui/pages/account/LevelUpAddress'));
// Auth
const Login = lazy(() => import('ui/pages/auth/Login'));
const Logout = lazy(() => import('ui/pages/auth/Logout'));
// Checkout
const Checkout = lazy(() => import('ui/pages/checkout/Checkout'));
const BillingAddress = lazy(() => import('ui/pages/checkout/BillingAddress'));
const DeliveryAddress = lazy(() => import('ui/pages/checkout/DeliveryAddress'));
// Games
const Games = lazy(() => import('ui/pages/games/Games'));
const Game = lazy(() => import('ui/pages/games/Game'));
// Listings
const Listing = lazy(() => import('ui/pages/listings/Listing'));
const EditListing = lazy(() => import('ui/pages/listings/EditListing'));
const NewListingPlatform = lazy(
  () => import('ui/pages/listings/NewListingPlatform'),
);
const NewListingGame = lazy(() => import('ui/pages/listings/NewListingGame'));
const NewListingForm = lazy(() => import('ui/pages/listings/NewListingForm'));
const MyListings = lazy(() => import('ui/pages/listings/MyListings'));
const MyListing = lazy(() => import('ui/pages/listings/MyListing'));
// Orders
const MyOrders = lazy(() => import('ui/pages/orders/MyOrders'));
const MyOrder = lazy(() => import('ui/pages/orders/MyOrder'));

export default function Routes() {
  return (
    <>
      <Route path={HOME} exact>
        <Home />
      </Route>

      <Route path={DASHBOARD} exact>
        <Dashboard />
      </Route>
      <Route path={LEVEL_UP_ADDRESS} exact>
        <LevelUpAddress />
      </Route>
      <Route path={LEVEL_UP_USERNAME} exact>
        <LevelUpUsername />
      </Route>

      <Route path={LOGIN} exact>
        <Login />
      </Route>
      <Route path={LOGOUT} exact>
        <Logout />
      </Route>

      <Route path={CHECKOUT} exact>
        <Checkout />
      </Route>
      <Route path={BILLING_ADDRESS} exact>
        <BillingAddress />
      </Route>
      <Route path={DELIVERY_ADDRESS} exact>
        <DeliveryAddress />
      </Route>

      <Route path={GAMES} exact>
        <Games />
      </Route>
      <Route path={GAME} exact>
        <Game />
      </Route>

      <Route path={GAME_LISTING} exact>
        <Listing />
      </Route>
      <Route path={EDIT_LISTING} exact>
        <EditListing />
      </Route>
      <Route path={NEW_LISTING} exact>
        <NewListingPlatform />
      </Route>
      <Route path={NEW_LISTING_PLATFORM} exact>
        <NewListingGame />
      </Route>
      <Route path={GAME_NEW_LISTING} exact>
        <NewListingForm />
      </Route>
      <Route path={MY_LISTINGS} exact>
        <MyListings />
      </Route>
      <Route path={MY_LISTING} exact>
        <MyListing />
      </Route>

      <Route path={MY_ORDERS} exact>
        <MyOrders />
      </Route>
      <Route path={MY_ORDER} exact>
        <MyOrder />
      </Route>
    </>
  );
}
