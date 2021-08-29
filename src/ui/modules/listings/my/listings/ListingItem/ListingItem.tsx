import React, { ReactNode } from 'react';
import { ListItem } from 'ui/elements/list';
import { useCurrency, useGetMessage } from 'ui/intl';
import StarRating from 'ui/modules/listings/listings/StarRating';
import { Link } from 'react-router-dom';
import Photo from 'ui/elements/Photo';
import cx from 'classnames';
import { ids } from 'ui/messages';
import type { Product } from '@sns/contracts/product';
import type { Listing } from '@sns/contracts/listing';

export default function MyListingItem({
  product,
  listing,
  orderStatus,
  to,
  price,
  hasActions,
  isComplete,
}: {
  to: string;
  product: Product;
  listing: Listing;
  orderStatus: ReactNode;
  price: number;
  hasActions: boolean;
  isComplete: boolean;
}) {
  const g = useGetMessage();
  const { rating, images, currency } = listing;
  const { name } = product;

  return (
    <ListItem
      className={cx(
        'hover:bg-gray-800',
        isComplete && 'bg-opacity-50 text-gray-400 hover:bg-gray-800',
      )}
    >
      <Link
        to={to}
        className={cx(
          'relative w-full flex items-center',
          hasActions &&
            'bg-secondary-darkest bg-opacity-40 hover:bg-opacity-70',
        )}
      >
        <If condition={hasActions}>
          <div className="absolute top-2 right-4 hidden md:block">
            <span className="text-gray-200" style={{ fontSize: '0.6em' }}>
              {g(ids.listings.myListings.hasActions)}
            </span>
          </div>
        </If>
        <div
          className="relative hidden sm:block w-1/3 lg:w-1/4 xl:w-1/5"
          style={{ '--aspect-ratio': 16 / 9 } as any}
        >
          <Photo
            alt="preview"
            src={Object.values(images)[0]}
            className="object-cover"
          />
        </div>
        <div className="w-1/2 sm:w-1/3 md:w-1/2 lg:w-1/4 xl:w-1/5 pl-4">
          <span className="block">{name}</span>
        </div>
        <div className="hidden lg:block w-1/4">
          {useCurrency(price, { currency })}
        </div>
        <div className="hidden xl:block w-1/4 xl:w-1/4">
          <StarRating rating={rating} />
        </div>
        <div className="flex flex-col lg:flex-row w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 items-center">
          {orderStatus}
        </div>
      </Link>
    </ListItem>
  );
}
