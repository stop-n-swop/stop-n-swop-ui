import React, { ReactNode } from 'react';
import Card from 'ui/elements/Card';
import FormError from 'ui/elements/FormError';
import Photo from 'ui/elements/Photo';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Button from 'ui/elements/Button';
import { Link } from 'react-router-dom';
import { makeGameListingPath, makeUserPath } from 'ui/constants/paths';
import type { Game } from '@sns/contracts/product';
import type { Listing } from '@sns/contracts/listing';

export default function Screen({
  error,
  listing,
  game,
  price,
  howItWorks,
  controls,
  children,
}: {
  error: any;
  listing: Listing;
  game: Game;
  price: ReactNode;
  howItWorks: ReactNode;
  controls: ReactNode;
  children?: ReactNode;
}) {
  const {
    id: listingId,
    productIds: [productId],
  } = listing;
  const getMessage = useGetMessage();

  return (
    <Card
      title={getMessage(ids.checkout.intro.title)}
      className="flex-grow lg:mx-auto lg:flex-grow-0 lg:mt-12 w-full max-w-screen-lg"
    >
      <div className="space-y-8">
        <FormError error={error} />
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="aspect aspect-16-9 w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 mx-auto">
            <Photo
              src={Object.values(listing.images)[0]}
              className="object-cover"
            />
          </div>
          <div className="flex-grow flex flex-col space-y-8">
            <div className="flex flex-col items-center sm:flex-row sm:justify-between">
              <Button
                padding={false}
                component={Link}
                to={makeGameListingPath({ listingId, productId })}
                className="text-xl"
              >
                {game.name}
              </Button>
              <span className="w-full sm:w-auto text-sm text-gray-200 flex justify-between">
                <span className="md:hidden">
                  {getMessage(ids.checkout.intro.seller)}&nbsp;
                </span>
                <Button
                  padding={false}
                  component={Link}
                  to={makeUserPath({ username: listing.username })}
                >
                  {listing.username}
                </Button>
              </span>
            </div>
            {price}
          </div>
        </div>
        {howItWorks}
        {controls}
        {children}
      </div>
    </Card>
  );
}
