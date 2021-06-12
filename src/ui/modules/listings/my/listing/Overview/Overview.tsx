import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { makeGameListingPath } from 'ui/constants/paths';
import Button from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Status as IStatus } from '@sns/contracts/order';
import Buyer from '../Buyer';
import Status from '../Status';

interface Props {
  productId: string;
  listingId: string;
  platformId: string;
  orderId: string;
  status: IStatus;
  buyer: string;
  history: ReactNode;
  actions: ReactNode;
}

export default function Overview({
  productId,
  listingId,
  platformId,
  orderId,
  status,
  buyer,
  history,
  actions,
}: Props) {
  const getMessage = useGetMessage();

  return (
    <div className="space-y-8">
      <div className="space-y-8 lg:flex lg:space-y-0">
        <div className="lg:w-1/2">
          <h3 className="font-semibold">
            {getMessage(ids.listings.myListing.listing)}
          </h3>
          <Button
            component={Link}
            to={makeGameListingPath({ listingId, platformId, productId })}
            className="text-sm inline-flex"
            padding={false}
          >
            {listingId}
          </Button>
        </div>
        <If condition={orderId}>
          <div>
            <h3 className="font-semibold">
              {getMessage(ids.listings.myListing.order)}
            </h3>
            <div className="text-sm">{orderId}</div>
          </div>
        </If>
      </div>
      <div className="space-y-8 lg:flex lg:space-y-0">
        <div className="lg:w-1/2">
          <Status status={status} />
        </div>
        <If condition={buyer}>
          <Buyer username={buyer} />
        </If>
      </div>
      {actions}
      {history}
    </div>
  );
}
