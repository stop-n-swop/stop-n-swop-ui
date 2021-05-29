import React, { ReactNode } from 'react';
import Button from 'ui/elements/Button';
import { makeGameListingPath } from 'ui/constants/paths';
import { Link } from 'react-router-dom';
import { useCurrency, useGetMessage } from 'ui/intl';
import cx from 'classnames';
import { ids } from 'ui/messages';

interface Props {
  productId: string;
  platformId: string;
  listingId: string;
  price: number;
  postage: number;
  currency: string;
  addToBasket: ReactNode;
  readonly?: boolean;
}

export default function Actions({
  readonly,
  price,
  postage,
  currency,
  productId,
  platformId,
  listingId,
  addToBasket,
}: Props) {
  const getMessage = useGetMessage();

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
      <div className="text-2xl text-right">
        {useCurrency(price, { currency })}
      </div>
      <div className="text-sm text-right text-gray-200 py-3">
        {getMessage(ids.listings.listing.postage, {
          postage: useCurrency(postage, { currency }),
        })}
      </div>
      <If condition={!readonly}>
        {addToBasket}
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
          <span>{getMessage(ids.listings.listing.details)}</span>
        </Button>
      </If>
    </div>
  );
}
