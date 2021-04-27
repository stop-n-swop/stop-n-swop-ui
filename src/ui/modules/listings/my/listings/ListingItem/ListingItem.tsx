import React, { ReactNode } from 'react';
import type { Listing } from '@sns/contracts/listing';
import { ListItem } from 'ui/elements/list';
import type { Product } from '@sns/contracts/product';
import { useCurrency } from 'ui/intl';
import StarRating from 'ui/modules/listings/listings/StarRating';
import { Link } from 'react-router-dom';

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
  const {
    price,
    rating,
    listingId,
    images: [image],
  } = listing;
  const { name } = product;

  return (
    <ListItem>
      <Link to={to} className="w-full flex items-center">
        <div
          className="relative hidden sm:block w-1/3 lg:w-1/4 xl:w-1/5"
          style={{ '--aspect-ratio': 16 / 9 } as any}
        >
          <img alt="preview" src={image} className="object-contain" />
        </div>
        <div className="w-2/3 sm:w-1/3 md:w-1/2 lg:w-1/4 xl:w-1/5 pl-4 sm:pl-0">
          <span className="block">{name}</span>
          <span className="text-sm text-gray-200">{listingId}</span>
        </div>
        <div className="hidden xl:block w-1/5">{useCurrency(price)}</div>
        <div className="hidden lg:block w-1/4 xl:w-1/4">
          <StarRating rating={rating} />
        </div>
        <div className="flex flex-col lg:flex-row w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5 items-center">
          {orderStatus}
        </div>
      </Link>
    </ListItem>
  );
}
