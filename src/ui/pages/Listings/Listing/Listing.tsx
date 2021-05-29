import React from 'react';
import Slideshow from 'ui/elements/Slideshow';
import Overview from 'ui/modules/listings/listing/Overview';
import Features from 'ui/modules/listings/listing/Features';
import Card from 'ui/elements/Card';
import PageTitle from 'ui/elements/PageTitle';
import AddToBasket from 'ui/modules/listings/AddToBasket';
import { useListing } from 'application/listings';
import { useGame } from 'application/games';
import { useParams } from 'react-router-dom';
import { useAddToBasket, useBasket } from 'application/basket';
import { isInBasket } from 'domain/selectors/basket';

export default function ListingPage() {
  const { listingId, productId } =
    useParams<{
      productId: string;
      listingId: string;
      platformId: string;
    }>();

  const { data: listing } = useListing({ id: listingId });
  const { data: product } = useGame({ id: productId });
  const { action: addToBasket, status } = useAddToBasket();
  const { data: basket } = useBasket();
  const listingText = `(${listingId})`;

  const {
    images,
    description,
    username,
    rating,
    currency,
    postage,
    price,
    location,
    stats,
  } = listing;
  const { name: productName } = product;
  const inBasket = isInBasket(listingId, basket);

  return (
    <div>
      <PageTitle>
        <span className="pr-6">{productName}</span>
        <span className="text-xs text-gray-500">{listingText}</span>
      </PageTitle>
      <Card className="md:mt-3 lg:mt-4 xl:mt-8 xl:w-4/5 xl:mx-auto flex flex-col lg:p-8 xl:pt-12 xl:px-0 xl:pb-0">
        <div className="lg:flex">
          <Slideshow images={Object.values(images)} className="lg:w-1/2 mb-4" />
          <Overview
            className="space-y-8 lg:w-1/2 xl:w-auto"
            description={description}
            location={location}
            username={username}
            rating={rating}
            currency={currency}
            postage={postage}
            price={price}
            addToBasket={
              <AddToBasket
                listingId={listingId}
                onAddToBasket={addToBasket}
                status={status}
                inBasket={inBasket}
              />
            }
          />
        </div>
        <Features stats={stats} />
      </Card>
    </div>
  );
}
