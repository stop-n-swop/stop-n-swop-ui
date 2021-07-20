import { Status } from '@sns/contracts/order';
import type { Listing } from '@sns/contracts/listing';

export const isListingComplete = (listing: Listing) =>
  [Status.COMPLETE, Status.CLOSED].includes(listing.status);

export const doesListingHaveActions = (listing: Listing) =>
  [Status.PLACED, Status.APPROVED].includes(listing.status);
