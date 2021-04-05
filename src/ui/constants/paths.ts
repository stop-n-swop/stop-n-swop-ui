export const HOME = '/';

// PRODUCTS
export const PRODUCTS = '/products';
export const PRODUCT = '/products/:productId';
export const makeProductPath = ({ productId }: { productId: string }) =>
  `${PRODUCTS}/${encodeURIComponent(productId)}`;

// COLLECTIONS
export const MY_COLLECTIONS = '/my/collections';

// LISTINGS
export const MY_LISTINGS = '/my/listings';
export const VIEW_MY_LISTING = '/my/listings/:listingId';
export const makeViewMyListingPath = ({ listingId }: { listingId: string }) =>
  `${MY_LISTINGS}/${encodeURIComponent(listingId)}`;
export const NEW_LISTING = '/list';
export const PRODUCT_LISTING = `products/:productId/listings/:listingId`;
export const makeProductListingPath = ({
  productId,
  listingId,
}: {
  productId: string;
  listingId: string;
}) => `${makeProductPath({ productId })}/listings/${listingId}`;
export const EDIT_LISTING = '/products/:productId/listings/:listingId/edit';
export const makeEditListingPath = ({
  productId,
  listingId,
}: {
  productId: string;
  listingId: string;
}) => `${makeProductListingPath({ productId, listingId })}/edit`;
export const PRODUCT_NEW_LISTING = '/products/:productId/list';
export const makeProductNewListingPath = ({
  productId,
}: {
  productId: string;
}) => `${makeProductPath({ productId })}/list`;

// USERS
export const USERS = '/users';
export const USER = '/users/:userId';
export const makeUserPath = ({ userId }: { userId: string }) =>
  `${USERS}/${encodeURIComponent(userId)}`;

// CHECKOUT
export const CHECKOUT = '/checkout';

// AUTH
export const LOGIN = '/login';
export const LOGOUT = '/logout';
export const REGISTER = '/register';
export const FORGOT_PASSWORD = '/forgot-password';
