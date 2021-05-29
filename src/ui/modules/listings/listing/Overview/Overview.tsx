import React, { ReactNode } from 'react';
import Button from 'ui/elements/Button';
import { useCurrency, useGetMessage } from 'ui/intl';
import { Link } from 'react-router-dom';
import { makeUserPath } from 'ui/constants/paths';
import StarRating from 'ui/modules/listings/listings/StarRating';
import { ids } from 'ui/messages';

export default function Overview({
  className,
  username,
  location,
  description,
  rating,
  price,
  postage,
  currency,
  addToBasket,
}: {
  className: string;
  username: string;
  location: string;
  description: string;
  rating: number;
  price: number;
  postage: number;
  currency: string;
  addToBasket: ReactNode;
}) {
  const getMessage = useGetMessage();

  return (
    <div className={className}>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xl">{useCurrency(price, { currency })}</div>
          <div className="text-sm text-gray-200">
            {getMessage(ids.listings.listing.postage, {
              postage: useCurrency(postage, { currency }),
            })}
          </div>
        </div>
        {addToBasket}
      </div>
      <div>
        <h3>{getMessage(ids.listings.listing.seller)}</h3>
        <div className="flex flex-col sm:flex-row sm:space-x-6 sm:items-center">
          <div className="flex items-center text-sm">
            <Button
              padding={false}
              component={Link}
              to={makeUserPath({ userId: username })}
              className="text-gray-300 mr-4"
            >
              {username}
            </Button>
            <StarRating rating={rating} />
          </div>
          <div className="text-sm text-gray-300">{location}</div>
        </div>
      </div>
      <If condition={description}>
        <div>
          <h3>{getMessage(ids.listings.listing.description)}</h3>
          <pre className="font-display whitespace-pre-wrap my-4">
            {description}
          </pre>
        </div>
      </If>
    </div>
  );
}
