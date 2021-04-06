import React from 'react';
import cartridge from 'ui/assets/s-l640.jpg';
import { Condition, Region, Listing as IListing } from '@sns/contracts/listing';
import MyListings from './MyListings';

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

export default function ConnectedMyListings() {
  return <MyListings listings={listings} />;
}
