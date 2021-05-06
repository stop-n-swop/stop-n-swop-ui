import { Status, Order } from '@sns/contracts/order';
import type { Audit, Listing } from '@sns/contracts/listing';
import React from 'react';
import Card from 'ui/elements/Card';
import PageTitle from 'ui/elements/PageTitle';
import Slideshow from 'ui/elements/Slideshow';
import Overview from 'ui/modules/listings/my/listing/Overview';

export default function MyListing({
  productName,
  listing,
  order,
  history,
}: {
  productName: string;
  listing: Listing;
  order: Order | undefined;
  history: Audit;
}) {
  const {
    listingId,
    productId,
    platformId,
    username,
    images,
    createdDate,
  } = listing;
  const listingText = `(${listingId})`;
  const status = order?.status ?? Status.NONE;

  return (
    <div>
      <PageTitle>
        <span className="pr-3">{productName}</span>
        <span className="text-sm text-gray-300">{listingText}</span>
      </PageTitle>
      <Card className="md:mt-3 lg:mt-4 xl:mt-8 xl:w-4/5 xl:mx-auto flex flex-col">
        <div className="lg:flex">
          <Slideshow images={images} className="lg:w-1/2 mb-4" />
          <Overview
            history={history}
            listingId={listingId}
            platformId={platformId}
            productId={productId}
            status={status}
            seller={username}
            buyer={order?.username}
            createdDate={createdDate}
          />
        </div>
      </Card>
    </div>
  );
}
