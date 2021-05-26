import React, { ReactNode } from 'react';
import { ListItem } from 'ui/elements/list';
import { useCurrency } from 'ui/intl';
import StarRating from 'ui/modules/listings/listings/StarRating';
import { Link } from 'react-router-dom';
import Photo from 'ui/elements/Photo';
import type { Product } from '@sns/contracts/product';
import type { Listing } from '@sns/contracts/listing';

export default function MyListingItem({
  product,
  listing,
  orderStatus,
  to,
}: {
  to: string;
  product: Product;
  listing: Listing;
  orderStatus: ReactNode;
}) {
  const { price, rating, id: listingId, images } = listing;
  const { name } = product;

  return (
    <ListItem className="hover:bg-gray-800">
      <Link to={to} className="w-full flex items-center">
        <div
          className="relative hidden sm:block w-1/3 lg:w-1/4 xl:w-1/5"
          style={{ '--aspect-ratio': 16 / 9 } as any}
        >
          <Photo
            alt="preview"
            src={Object.values(images)[0]}
            className="object-contain"
          />
        </div>
        <div className="w-1/2 sm:w-1/3 md:w-1/2 lg:w-1/4 xl:w-1/5 pl-4 sm:pl-0">
          <span className="block">{name}</span>
          <span className="hidden lg:block text-xs text-gray-300">
            {listingId}
          </span>
        </div>
        <div className="hidden lg:block w-1/4">{useCurrency(price)}</div>
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
