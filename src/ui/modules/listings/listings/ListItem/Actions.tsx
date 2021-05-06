import React from 'react';
import Button from 'ui/elements/Button';
import { makeGameListingPath } from 'ui/constants/paths';
import { Link } from 'react-router-dom';
import { useCurrency, useMessage } from 'ui/intl';
import cx from 'classnames';
import { ids } from 'ui/messages';
import AddToBasket from '../../listing/AddToBasket';

interface Props {
  productId: string;
  platformId: string;
  listingId: string;
  price: number;
  readonly?: boolean;
}

export default function Actions({
  readonly,
  price,
  productId,
  platformId,
  listingId,
}: Props) {
  return (
    <div
      className={cx(
        'flex flex-col justify-between py-3 px-6 flex-shrink-0',
        readonly && 'justify-around',
        'sm:w-1/2 sm:ml-auto',
        'md:w-1/3 md:ml-0',
        'lg:w-5/12',
        'xl:w-auto',
      )}
    >
      <div className="text-2xl text-center sm:text-right">
        {useCurrency(price)}
      </div>
      <If condition={!readonly}>
        <AddToBasket
          productId={productId}
          listingId={listingId}
          className="text-sm"
        />
        <Button
          kind="tertiary"
          className="text-xs md:px-0"
          style={{ justifyContent: 'flex-end' }}
          component={Link}
          to={makeGameListingPath({
            productId,
            platformId,
            listingId,
          })}
        >
          <span>{useMessage(ids.listings.listing.details)}</span>
        </Button>
      </If>
    </div>
  );
}
