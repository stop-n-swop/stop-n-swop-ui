import React from 'react';
import Slideshow from 'ui/elements/Slideshow';
import Overview from 'ui/modules/listings/listing/Overview';
import Features from 'ui/modules/listings/listing/Features';
import { ImageUrl } from 'core/types';
import { Stats } from 'core/entity/listings';
import Card from 'ui/elements/Card';
import PageTitle from 'ui/elements/PageTitle';

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
  const listingText = `(${listingId})`;

  return (
    <div>
      <PageTitle>
        <span className="pr-3">{productName}</span>
        <span className="text-sm text-gray-300">{listingText}</span>
      </PageTitle>
      <Card className="md:mt-3 lg:mt-4 xl:mt-8 xl:w-4/5 xl:mx-auto flex flex-col lg:p-8 xl:pt-12 xl:px-0 xl:pb-0">
        <div className="lg:flex">
          <Slideshow images={images} className="lg:w-1/2 mb-4" />
          <Overview
            productId={productId}
            listingId={listingId}
            className="space-y-8 lg:w-1/2 xl:w-auto"
            description={description}
            location={location}
            username={username}
          />
        </div>
        <Features stats={stats} />
      </Card>
    </div>
  );
}
