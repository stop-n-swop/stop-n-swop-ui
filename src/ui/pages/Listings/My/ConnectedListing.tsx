import React, { useState } from 'react';
import { Status as RStatus } from '@respite/core';
import { Listing as IListing } from 'core/entity/listings';
import { Order } from 'core/entity/orders';
import { Status } from 'core/constants/order';
import { Product } from 'core/entity/products';
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
