export const HOME = '/';

// PRODUCTS
export const PRODUCTS = '/products';
export const PRODUCT = '/products/:productId';

// COLLECTIONS
export const MY_COLLECTIONS = '/my/collections';

// LISTINGS
export const MY_LISTINGS = '/my/listings';
export const NEW_LISTING = '/list';
export const PRODUCT_LISTING = '/products/:productId/listings/:listingId';
export const PRODUCT_NEW_LISTING = '/products/:productId/list';
export const makeProductPath = ({ productId }: { productId: string }) =>
  `/products/${encodeURIComponent(productId)}`;
export const makeProductListingPath = ({
  productId,
  listingId,
}: {
  productId: string;
  listingId: string;
}) => `/products/${encodeURIComponent(productId)}/listings/${listingId}`;
export const makeProductNewListingPath = ({
  productId,
}: {
  productId: string;
}) => `/products/${encodeURIComponent(productId)}/list`;

// USERS
export const USERS = '/users';
export const USER = '/users/:userId';
export const makeUserPath = ({ userId }: { userId: string }) =>
  `/users/${encodeURIComponent(userId)}`;

// CHECKOUT
export const CHECKOUT = '/checkout';

// AUTH
export const LOGIN = '/login';
export const LOGOUT = '/logout';
export const REGISTER = '/register';
export const FORGOT_PASSWORD = '/forgot-password';
