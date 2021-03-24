import React from 'react';
import cartridge from 'ui/assets/s-l640.jpg';
import cartridge2 from 'ui/assets/cartridge-back.jpg';
import cartridge3 from 'ui/assets/Super_Mario_64_Boxart.png';
import { Condition, Region } from 'core/constants/listings';
import { Listing as IListing } from 'core/entity/listings';
import { Product } from 'core/entity/products';
import { useParams } from 'react-router-dom';
import Listing from './Listing';

export default function ConnectedListingPage() {
  const { listingId, productId } = useParams<{
    productId: string;
    listingId: string;
  }>();

  const listing: IListing = {
    productId,
    listingId,
    images: [cartridge, cartridge2, cartridge3],
    location: 'London, UK',
    price: 50,
    rating: 3.5,
    description: 'This is a description given by the seller.',
    username: 'seller1337',
    stats: {
      boxed: true,
      condition: Condition.GOOD,
      instructions: true,
      region: Region.PAL,
    },
  };
  const product: Product = {
    productId,
    banner: '',
    cover: '',
    developer: 'Nintendo',
    publisher: 'Nintendo',
    name: 'Super Mario 64',
    platformId: 'n64',
    type: 'game',
    releaseDate: new Date(new Date('1996-06-23')),
  };

  return (
    <Listing
      productId={productId}
      listingId={listingId}
      description={listing.description}
      images={listing.images}
      location={listing.location}
      productName={product.name}
      stats={listing.stats}
      username={listing.username}
    />
  );
}
