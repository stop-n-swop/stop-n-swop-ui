import React from 'react';
import Button from 'ui/elements/Button';
import { makeProductListingPath } from 'ui/constants/paths';
import { Link } from 'react-router-dom';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { ids } from 'ui/messages';
import AddToBasket from '../../listing/AddToBasket';

interface Props {
  productId: string;
  listingId: string;
  price: number;
}

export default function Actions({ price, productId, listingId }: Props) {
  return (
    <div className="flex flex-col justify-between py-3 px-6 flex-shrink-0 sm:w-1/2 sm:ml-auto md:w-1/3 lg:w-5/12 xl:w-auto md:ml-0">
      <div className="text-xl text-center sm:text-right">
        <FormattedNumber value={price} style="currency" currency="GBP" />
      </div>
      <AddToBasket
        productId={productId}
        listingId={listingId}
        className="text-sm"
      />
      <Button
        kind="tertiary"
        className="text-xs md:px-0"
        component={Link}
        to={makeProductListingPath({
          productId,
          listingId,
        })}
      >
        <span>
          <FormattedMessage id={ids.listings.listing.details} />
        </span>
      </Button>
    </div>
  );
}
