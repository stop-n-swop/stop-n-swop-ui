import React from 'react';
import { Status as RStatus } from '@respite/core';
import { Listing } from 'core/entity/listings';
import { Order } from 'core/entity/orders';
import { Product } from 'core/entity/products';
import ListingItem from 'ui/modules/listings/my/listings/ListingItem';
import OrderStatus from 'ui/modules/listings/my/listings/OrderStatus';
import Actions from 'ui/modules/listings/my/listings/Actions';
import { Status } from 'core/constants/order';

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
  return (
    <ListingItem
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
