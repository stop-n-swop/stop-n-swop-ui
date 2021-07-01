import { GAME, makeGamePath } from './games';

export const MY_LISTINGS = '/my/listings';

export const MY_LISTING = '/my/listings/:listingId';
export const makeMyListingPath = ({ listingId }: { listingId: string }) =>
  `${MY_LISTINGS}/${encodeURIComponent(listingId)}`;

export const NEW_LISTING = '/list';

export const NEW_LISTING_PLATFORM = '/list/:platformId';
export const makeNewListingPlatformPath = ({
  platformId,
}: {
  platformId: string;
}) => `${NEW_LISTING}/${platformId}`;

export const GAME_LISTING = `${GAME}/listings/:listingId`;
export const makeGameListingPath = ({
  productId,
  listingId,
}: {
  productId: string;
  listingId: string;
}) => `${makeGamePath({ productId })}/listings/${listingId}`;

export const EDIT_LISTING = `${MY_LISTING}/edit`;
export const makeEditListingPath = ({ listingId }: { listingId: string }) =>
  `${makeMyListingPath({ listingId })}/edit`;

export const GAME_NEW_LISTING = `${NEW_LISTING_PLATFORM}/:productId`;
export const makeGameNewListingPath = ({
  platformId,
  productId,
}: {
  platformId: string;
  productId: string;
}) => `${makeNewListingPlatformPath({ platformId })}/${productId}`;
export const NEW_LISTING_COMPLETE = `${GAME_NEW_LISTING}/:listingId`;
export const makeNewListingCompletePath = ({
  platformId,
  productId,
  listingId,
}: {
  platformId: string;
  productId: string;
  listingId: string;
}) => {
  return `${makeGameNewListingPath({ platformId, productId })}/${listingId}`;
};
