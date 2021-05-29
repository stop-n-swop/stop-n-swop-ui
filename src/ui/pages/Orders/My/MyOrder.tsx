import React, { useState } from 'react';
import cartridge from 'ui/assets/s-l640.jpg';
import { Condition, Region, Listing as IListing } from '@sns/contracts/listing';
import Order from 'ui/modules/orders/my/Order';
import OrderStatus from 'ui/modules/orders/my/OrderStatus';
import { Game, Type } from '@sns/contracts/product';
import { makeGameListingPath } from 'ui/constants/paths';
import type { Order as IOrder } from '@sns/contracts/order';

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
    status: null,
    id: 'a',
    products: [
      {
        productId: 'super_mario_64',
        platformId: 'nintendo-64',
      },
    ],
    currency: 'GBP',
    postage: 0,
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
    images: { main: cartridge },
    createdDate: new Date(),
  },
  {
    status: null,
    id: 'b',
    currency: 'GBP',
    postage: 0,
    products: [
      {
        productId: 'super_mario_64',
        platformId: 'nintendo-64',
      },
    ],
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
    images: { main: cartridge },
    createdDate: new Date(),
  },
  {
    status: null,
    id: 'c',
    currency: 'GBP',
    postage: 0,
    products: [
      {
        productId: 'super_mario_64',
        platformId: 'nintendo-64',
      },
    ],
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
    images: { main: cartridge },
    createdDate: new Date(),
  },
];

export default function MyOrder({ order: o }: { order: IOrder }) {
  const [order] = useState(() => o);
  const listing = listings.find((listing) => listing.id === order.listingId);
  const {
    id: listingId,
    products: [{ productId, platformId }],
  } = listing;

  return (
    <Order
      to={makeGameListingPath({ productId, platformId, listingId })}
      listing={listing}
      product={product}
      orderStatus={<OrderStatus order={order} />}
    />
  );
}
