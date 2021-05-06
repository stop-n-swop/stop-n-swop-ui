import React, { useState } from 'react';
import { Status as RStatus } from '@respite/core';
import cartridge from 'ui/assets/s-l640.jpg';
import { Condition, Region, Listing as IListing } from '@sns/contracts/listing';
import Actions from 'ui/modules/orders/my/Actions';
import Order from 'ui/modules/orders/my/Order';
import OrderStatus from 'ui/modules/orders/my/OrderStatus';
import { Game, Type } from '@sns/contracts/product';
import type { Status, Order as IOrder } from '@sns/contracts/order';
import { makeGameListingPath } from 'ui/constants/paths';

const product: Game = {
  banner: '',
  rawgId: -1,
  cover: '',
  developers: [],
  platforms: [{ id: 'n64', releaseDate: new Date() }],
  id: 'super_mario_64',
  publishers: [],
  releaseDate: new Date(),
  type: Type.GAME,
  name: 'Super Mario 64',
};

const listings: IListing[] = [
  {
    productId: 'super_mario_64',
    listingId: 'a',
    platformId: 'nintendo-64',
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
    platformId: 'nintendo-64',
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
    platformId: 'nintendo-64',
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
  const { productId, listingId, platformId } = listing;
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
      to={makeGameListingPath({ productId, platformId, listingId })}
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
