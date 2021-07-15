import React from 'react';
import ListingItem from 'ui/modules/listings/my/listings/ListingItem';
import OrderStatus from 'ui/modules/listings/my/listings/OrderStatus';
import { makeMyListingPath } from 'ui/constants/paths';
import { useGame } from 'application/games';
import { Listing, getListedPrice } from '@sns/contracts/listing';
import {
  doesListingHaveActions,
  isListingComplete,
} from 'domain/selectors/listings';

export default function MyListing({ listing }: { listing: Listing }) {
  const {
    id: listingId,
    productIds: [productId],
  } = listing;
  const { data: product } = useGame({ id: productId });
  const hasActions = doesListingHaveActions(listing);
  const isComplete = isListingComplete(listing);
  // TODO: get the listing order

  return (
    <ListingItem
      to={makeMyListingPath({ listingId })}
      listing={listing}
      product={product}
      orderStatus={<OrderStatus status={listing.status} />}
      price={getListedPrice(listing)}
      hasActions={hasActions}
      isComplete={isComplete}
    />
  );
}
