import React from 'react';
import Slideshow from 'ui/elements/Slideshow';
import Overview from 'ui/modules/listings/listing/Overview';
import Features from 'ui/modules/listings/listing/Features';
import { ImageUrl } from 'core/types';
import { Stats } from 'core/entity/listings';

export default function ListingPage({
  productId,
  listingId,
  images,
  description,
  location,
  productName,
  username,
  stats,
}: {
  productId: string;
  listingId: string;
  images: ImageUrl[];
  description: string;
  location: string;
  productName: string;
  username: string;
  stats: Stats;
}) {
  return (
    <div className="xl:w-4/5 xl:mx-auto flex-grow flex flex-col lg:p-8 xl:px-0">
      <div className="lg:flex">
        <Slideshow images={images} className="lg:w-1/2" />
        <Overview
          productId={productId}
          listingId={listingId}
          className="space-y-8 lg:w-1/2 xl:w-auto"
          description={description}
          location={location}
          name={productName}
          username={username}
        />
      </div>
      <Features stats={stats} />
    </div>
  );
}
