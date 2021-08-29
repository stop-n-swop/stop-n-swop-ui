import { Status } from '@sns/contracts/order';
import type { Listing } from '@sns/contracts/listing';

export const isListingOpen = (listing: Listing) => {
  return listing.status === Status.OPEN;
};

export const isListingClosed = (listing: Listing) => {
  return listing.status === Status.CLOSED;
};

export const isListingComplete = (listing: Listing) => {
  return [Status.COMPLETE, Status.CLOSED].includes(listing.status);
};

export const isListingInProgress = (listing: Listing) => {
  return (
    !isListingOpen(listing) &&
    !isListingClosed(listing) &&
    !isListingComplete(listing)
  );
};

export const doesListingHaveActions = (listing: Listing) => {
  return [Status.PLACED, Status.APPROVED].includes(listing.status);
};
