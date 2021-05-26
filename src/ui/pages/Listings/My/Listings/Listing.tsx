import React from 'react';
import ListingItem from 'ui/modules/listings/my/listings/ListingItem';
import OrderStatus from 'ui/modules/listings/my/listings/OrderStatus';
import { makeViewMyListingPath } from 'ui/constants/paths';
import { useGame } from 'application/games';
import type { Listing } from '@sns/contracts/listing';

export default function MyListing({ listing }: { listing: Listing }) {
  const {
    id: listingId,
    products: [{ productId }],
  } = listing;
  const { data: product } = useGame({ id: productId });
  // TODO: get the listing order

  return (
    <ListingItem
      to={makeViewMyListingPath({ listingId })}
      listing={listing}
      product={product}
      orderStatus={<OrderStatus order={null} />}
    />
  );
}
