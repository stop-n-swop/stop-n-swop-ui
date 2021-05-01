import { makeGamePath } from './games';

export const MY_LISTINGS = '/my/listings';
export const VIEW_MY_LISTING = '/my/listings/:listingId';
export const makeViewMyListingPath = ({ listingId }: { listingId: string }) =>
  `${MY_LISTINGS}/${encodeURIComponent(listingId)}`;
export const NEW_LISTING = '/list';
export const GAME_LISTING = `/games/:productId/listings/:listingId`;
export const makeGameListingPath = ({
  productId,
  listingId,
}: {
  productId: string;
  listingId: string;
}) => `${makeGamePath({ productId })}/listings/${listingId}`;
export const EDIT_LISTING = '/games/:productId/listings/:listingId/edit';
export const makeEditListingPath = ({
  productId,
  listingId,
}: {
  productId: string;
  listingId: string;
}) => `${makeGameListingPath({ productId, listingId })}/edit`;
export const GAME_NEW_LISTING = '/games/:productId/list';
export const makeGameNewListingPath = ({ productId }: { productId: string }) =>
  `${makeGamePath({ productId })}/list`;
export const MY_ORDERS = '/my/orders';
