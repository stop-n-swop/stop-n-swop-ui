import React from 'react';
import { Condition, Region } from 'core/constants/listings';
import { Audit, Listing } from 'core/entity/listings';
import cartridge from 'ui/assets/s-l640.jpg';
import cartridge2 from 'ui/assets/cartridge-back.jpg';
import cartridge3 from 'ui/assets/Super_Mario_64_Boxart.png';
import { Order } from 'core/entity/orders';
import { Status } from 'core/constants/order';
import MyListing from './MyListing';

const listing: Listing = {
  listingId: 'sm64_001',
  description: '',
  location: 'London, UK',
  price: 50,
  productId: 'super_mario_64',
  rating: 3.5,
  stats: {
    boxed: false,
    condition: Condition.POOR,
    region: Region.PAL,
    instructions: false,
  },
  username: 'seller1337',
  images: [cartridge, cartridge2, cartridge3],
  createdDate: new Date('2021-03-30'),
};
const order: Order = {
  listingId: listing.listingId,
  username: 'buyer1',
  status: Status.RECEIVED,
};
const audit: Audit = [
  {
    listingId: listing.listingId,
    date: new Date(),
    username: order.username,
    status: Status.CREATED,
  },
  {
    listingId: listing.listingId,
    date: new Date(),
    username: order.username,
    status: Status.SOLD,
  },
  {
    listingId: listing.listingId,
    date: new Date(),
    username: listing.username,
    status: Status.POSTED,
  },
  {
    listingId: listing.listingId,
    date: new Date(),
    username: order.username,
    status: Status.RECEIVED,
  },
];

export default function ConnectedMyListing() {
  return (
    <MyListing
      history={audit}
      listing={listing}
      order={order}
      productName="Super Mario 64"
    />
  );
}
