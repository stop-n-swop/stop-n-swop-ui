import React from 'react';
import { Status as RStatus } from '@respite/core';
import type { Listing } from '@sns/contracts/listing';
import { Order, Status } from '@sns/contracts/order';
import type { Product } from '@sns/contracts/product';
import ListingItem from 'ui/modules/listings/my/listings/ListingItem';
import OrderStatus from 'ui/modules/listings/my/listings/OrderStatus';
import Actions from 'ui/modules/listings/my/listings/Actions';

import { makeViewMyListingPath } from 'ui/constants/paths';

export default function MyListing({
  listing,
  product,
  order,
  status,
  onClick,
}: {
  listing: Listing;
  product: Product;
  order: Order;
  status: RStatus;
  onClick(status: Status): void;
}) {
  const { listingId } = listing;

  return (
    <ListingItem
      to={makeViewMyListingPath({ listingId })}
      listing={listing}
      product={product}
      orderStatus={
        <OrderStatus
          order={order}
          actions={
            <Actions
              status={status}
              listing={listing}
              order={order}
              onClick={onClick}
            />
          }
        />
      }
    />
  );
}
