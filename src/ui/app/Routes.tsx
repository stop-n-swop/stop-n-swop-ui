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
  MY_LISTING,
  NEW_LISTING_COMPLETE,
  CHECKOUT_COMPLETE,
  CHECKOUT_PAYMENT,
  BALANCE,
  USER,
} from 'ui/constants/paths';
import Home from 'ui/pages/Home';
import TermsScreen from 'ui/modules/terms/Screen';

// Account
const Dashboard = lazy(() => import('ui/pages/account/Dashboard'));
const Balance = lazy(() => import('ui/pages/account/Balance'));
const LevelUpUsername = lazy(() => import('ui/pages/account/LevelUpUsername'));
const LevelUpAddress = lazy(() => import('ui/pages/account/LevelUpAddress'));
const User = lazy(() => import('ui/pages/account/User'));
// Auth
const Login = lazy(() => import('ui/pages/auth/Login'));
const Logout = lazy(() => import('ui/pages/auth/Logout'));
// Checkout
const Checkout = lazy(() => import('ui/pages/checkout/Checkout'));
const Payment = lazy(() => import('ui/pages/checkout/Payment'));
const Complete = lazy(() => import('ui/pages/checkout/Complete'));
// Games
const Games = lazy(() => import('ui/pages/games/Games'));
const Game = lazy(() => import('ui/pages/games/Game'));
// Listings
const Listing = lazy(() => import('ui/pages/listings/Listing'));
const EditListing = lazy(() => import('ui/pages/listings/EditListing'));
const NewListingGame = lazy(() => import('ui/pages/listings/NewListingGame'));
const NewListingForm = lazy(() => import('ui/pages/listings/NewListingForm'));
const NewListingComplete = lazy(
  () => import('ui/pages/listings/NewListingCompete'),
);
const MyListings = lazy(() => import('ui/pages/listings/MyListings'));
const MyListing = lazy(() => import('ui/pages/listings/MyListing'));
// Orders
const MyOrders = lazy(() => import('ui/pages/orders/MyOrders'));
const MyOrder = lazy(() => import('ui/pages/orders/MyOrder'));
// Guide
const Guide = lazy(() => import('ui/pages/Guide'));
const Privacy = lazy(() => import('ui/help/terms/privacy.mdx'));
const Terms = lazy(() => import('ui/help/terms/terms.mdx'));
const Credits = lazy(() => import('ui/help/terms/credits.mdx'));

export default function Routes() {
  return (
    <>
      {/* Home */}
      <Route path={HOME} exact>
        <Home />
      </Route>

      {/* Account */}
      <Route path={DASHBOARD} exact>
        <Dashboard />
      </Route>
      <Route path={BALANCE} exact>
        <Balance />
      </Route>
      <Route path={LEVEL_UP_ADDRESS} exact>
        <LevelUpAddress />
      </Route>
      <Route path={LEVEL_UP_USERNAME} exact>
        <LevelUpUsername />
      </Route>
      <Route path={USER} exact>
        <User />
      </Route>

      {/* Auth */}
      <Route path={LOGIN} exact>
        <Login />
      </Route>
      <Route path={LOGOUT} exact>
        <Logout />
      </Route>

      {/* Checkout */}
      <Route path={CHECKOUT} exact>
        <Checkout />
      </Route>
      <Route path={CHECKOUT_PAYMENT} exact>
        <Payment />
      </Route>
      <Route path={CHECKOUT_COMPLETE} exact>
        <Complete />
      </Route>

      {/* Games */}
      <Route path={GAMES} exact>
        <Games />
      </Route>
      <Route path={GAME} exact>
        <Game />
      </Route>

      {/* Listings */}
      <Route path={GAME_LISTING} exact>
        <Listing />
      </Route>
      <Route path={EDIT_LISTING} exact>
        <EditListing />
      </Route>
      <Route path={NEW_LISTING} exact>
        <NewListingGame />
      </Route>
      <Route path={GAME_NEW_LISTING} exact>
        <NewListingForm />
      </Route>
      <Route path={NEW_LISTING_COMPLETE} exact>
        <NewListingComplete />
      </Route>
      <Route path={MY_LISTINGS} exact>
        <MyListings />
      </Route>
      <Route path={MY_LISTING} exact>
        <MyListing />
      </Route>

      {/* Orders */}
      <Route path={MY_ORDERS} exact>
        <MyOrders />
      </Route>
      <Route path={MY_ORDER} exact>
        <MyOrder />
      </Route>

      <Route path="/privacy" exact>
        <TermsScreen>
          <Privacy />
        </TermsScreen>
      </Route>
      <Route path="/terms" exact>
        <TermsScreen>
          <Terms />
        </TermsScreen>
      </Route>
      <Route path="/credits" exact>
        <TermsScreen>
          <Credits />
        </TermsScreen>
      </Route>
      <Route path="/guide">
        <Guide />
      </Route>
    </>
  );
}
