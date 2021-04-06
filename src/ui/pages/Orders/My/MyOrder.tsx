import React, { useState } from 'react';
import { Status as RStatus } from '@respite/core';
import cartridge from 'ui/assets/s-l640.jpg';
import { Condition, Region } from 'core/constants/listings';
import { Listing as IListing } from 'core/entity/listings';
import Actions from 'ui/modules/orders/my/Actions';
import Order from 'ui/modules/orders/my/Order';
import OrderStatus from 'ui/modules/orders/my/OrderStatus';
import { Product } from 'core/entity/products';
import { Status } from 'core/constants/order';
import { Order as IOrder } from 'core/entity/orders';
import { makeProductListingPath } from 'ui/constants/paths';

const product: Product = {
  banner: '',
  cover: '',
  developer: '',
  platformId: 'n64',
  productId: 'super_mario_64',
  publisher: '',
  releaseDate: new Date(),
  type: '',
  name: 'Super Mario 64',
};

const listings: IListing[] = [
  {
    productId: 'super_mario_64',
    listingId: 'a',
    description: "It's awesome",
    location: 'London, UK',
    price: 50,
    rating: 4,
    username: 'seller1337',
    stats: {
      boxed: true,
      instructions: true,
      condition: Condition.USED,
      region: Region.PAL,
    },
    images: [cartridge],
    createdDate: new Date(),
  },
  {
    productId: 'super_mario_64',
    listingId: 'b',
    description: "It's awesome",
    location: 'London, UK',
    price: 50,
    rating: 4,
    username: 'seller1337',
    stats: {
      boxed: true,
      instructions: true,
      condition: Condition.USED,
      region: Region.PAL,
    },
    images: [cartridge],
    createdDate: new Date(),
  },
  {
    productId: 'super_mario_64',
    listingId: 'c',
    description: "It's awesome",
    location: 'London, UK',
    price: 50,
    rating: 4,
    username: 'seller1337',
    stats: {
      boxed: true,
      instructions: true,
      condition: Condition.USED,
      region: Region.PAL,
    },
    images: [cartridge],
    createdDate: new Date(),
  },
];

export default function MyOrder({ order: o }: { order: IOrder }) {
  const [order, setOrder] = useState(() => o);
  const listing = listings.find(
    (listing) => listing.listingId === order.listingId,
  );
  const { productId, listingId } = listing;
  const [status, setStatus] = useState<RStatus>(RStatus.IDLE);
  const handleClick = (status: Status) => {
    setStatus(RStatus.LOADING);
    setTimeout(() => {
      setStatus(RStatus.SUCCESS);
      setTimeout(() => {
        setOrder({
          ...order,
          status,
        });
        setStatus(RStatus.IDLE);
      }, 1000);
    }, 1000);
  };
  return (
    <Order
      to={makeProductListingPath({ productId, listingId })}
      listing={listing}
      product={product}
      orderStatus={
        <OrderStatus
          order={order}
          actions={
            <Actions onClick={handleClick} order={order} status={status} />
          }
        />
      }
    />
  );
}
