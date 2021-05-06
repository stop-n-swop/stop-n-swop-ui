import React, { useState } from 'react';
import { Status as RStatus } from '@respite/core';
import type { Listing as IListing } from '@sns/contracts/listing';
import { Order, Status } from '@sns/contracts/order';
import { Game, Type } from '@sns/contracts/product';
import Listing from './Listing';

const orders: Order[] = [
  {
    listingId: 'b',
    username: 'buyer1',
    status: Status.SOLD,
  },
  {
    listingId: 'c',
    username: 'buyer1',
    status: Status.POSTED,
  },
];
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

export default function ConnectedMyListing({ listing }: { listing: IListing }) {
  const [order, setOrder] = useState(() =>
    orders.find((order) => order.listingId === listing.listingId),
  );
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
    <Listing
      listing={listing}
      order={order}
      product={product}
      status={status}
      onClick={handleClick}
    />
  );
}
