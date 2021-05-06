import React from 'react';
import cartridge from 'ui/assets/s-l640.jpg';
import cartridge2 from 'ui/assets/cartridge-back.jpg';
import cartridge3 from 'ui/assets/Super_Mario_64_Boxart.png';
import { Condition, Region, Listing as IListing } from '@sns/contracts/listing';
import { Game, Type } from '@sns/contracts/product';
import { useParams } from 'react-router-dom';
import Listing from './Listing';

export default function ConnectedListingPage() {
  const { listingId, productId, platformId } = useParams<{
    productId: string;
    listingId: string;
    platformId: string;
  }>();

  const listing: IListing = {
    productId,
    listingId,
    platformId,
    images: [cartridge, cartridge2, cartridge3],
    location: 'London, UK',
    price: 50,
    rating: 3.5,
    description: 'This is a description given by the seller.',
    username: 'seller1337',
    stats: {
      boxed: true,
      condition: Condition.LIKE_NEW,
      instructions: true,
      region: Region.PAL,
    },
    createdDate: new Date(),
  };
  const product: Game = {
    id: productId,
    rawgId: -1,
    banner: '',
    cover: '',
    developers: ['Nintendo'],
    publishers: ['Nintendo'],
    name: 'Super Mario 64',
    platforms: [{ id: 'n64', releaseDate: new Date(new Date('1996-06-23')) }],
    type: Type.GAME,
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
