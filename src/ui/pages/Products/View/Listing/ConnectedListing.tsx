import React, { CSSProperties } from 'react';
import cartridge from 'ui/assets/s-l640.jpg';
import { Condition, Region, Listing as IListing } from '@sns/contracts/listing';
import Listing from './Listing';

interface Props {
  productId: string;
  listingId: string;
  style: CSSProperties;
}

export default function ConnectedListing({
  listingId,
  productId,
  style,
}: Props) {
  const listing: IListing = {
    productId,
    listingId,
    images: [cartridge],
    location: 'London, UK',
    price: 50,
    rating: 3.5,
    description: '',
    username: 'seller1337',
    stats: {
      boxed: true,
      condition: Condition.USED,
      instructions: true,
      region: Region.PAL,
    },
    createdDate: new Date(),
  };

  return (
    <Listing
      productId={productId}
      listingId={listingId}
      username={listing.username}
      image={listing.images[0]}
      location={listing.location}
      price={listing.price}
      rating={listing.rating}
      stats={listing.stats}
      style={style}
    />
  );
}
