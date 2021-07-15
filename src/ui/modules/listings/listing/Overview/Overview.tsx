import React, { ReactNode } from 'react';
import Button from 'ui/elements/Button';
import { useCurrency, useGetCurrency, useGetMessage } from 'ui/intl';
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
  const getCurrency = useGetCurrency();

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row sm:space-x-8 items-center  sm:justify-between">
        <div className="flex space-x-8 items-center w-full sm:w-auto justify-end sm:justify-start">
          <div className="text-xl">{useCurrency(price, { currency })}</div>
          <div className="text-sm text-gray-200">
            <Choose>
              <When condition={postage}>
                {getMessage(ids.listings.listing.postage, {
                  postage: getCurrency(postage, { currency }),
                })}
              </When>
              <Otherwise>
                {getMessage(ids.listings.listing.noPostage)}
              </Otherwise>
            </Choose>
          </div>
        </div>
        <div className="w-full sm:w-auto">{addToBasket}</div>
      </div>
      <div>
        <h3>{getMessage(ids.listings.listing.seller)}</h3>
        <div className="flex flex-col sm:flex-row sm:space-x-6 sm:items-center">
          <div className="flex items-center text-sm">
            <Button
              padding={false}
              component={Link}
              to={makeUserPath({ username })}
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
