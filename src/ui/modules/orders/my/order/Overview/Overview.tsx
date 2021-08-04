import React, { ReactNode } from 'react';
import { makeGameListingPath, makeUserPath } from 'ui/constants/paths';
import { LinkButton } from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { colorMatrix, iconMatrix } from 'ui/modules/listings/utils';
import type { Order } from '@sns/contracts/order';
import type { Listing } from '@sns/contracts/listing';

interface Props {
  order: Order;
  listing: Listing;
  history: ReactNode;
  actions: ReactNode;
  help: ReactNode;
}

export default function Overview({
  actions,
  history,
  help,
  listing: {
    id: listingId,
    productIds: [productId],
    username: seller,
  },
  order: { id: orderId, status },
}: Props) {
  const getMessage = useGetMessage();
  const Icon = iconMatrix[status];
  const color = colorMatrix[status];

  return (
    <div className="space-y-8">
      <div className="space-y-8 lg:flex lg:space-y-0">
        <div className="lg:w-1/2">
          <h3 className="font-semibold">
            {getMessage(ids.order.myOrder.order)}
          </h3>
          <div className="text-sm">{orderId}</div>
        </div>
        <div>
          <h3 className="font-semibold">
            {getMessage(ids.order.myOrder.listing)}
          </h3>
          <LinkButton
            to={makeGameListingPath({
              listingId,
              productId,
            })}
            className="text-sm inline-flex"
          >
            {listingId}
          </LinkButton>
        </div>
      </div>
      <div className="space-y-8 lg:flex lg:space-y-0">
        <div className="lg:w-1/2">
          <h3 className="font-semibold">
            {getMessage(ids.listings.myListing.status.label)}
          </h3>
          <div className="text-sm flex items-center space-x-4">
            <span className={color}>
              <Icon size="1em" />
            </span>
            <span>
              {getMessage(ids.order.status[status] ?? ids.order.status.open)}
            </span>
          </div>
        </div>
        <div className="lg:w-1/2">
          <h3 className="font-semibold">
            {getMessage(ids.listings.myListing.seller.label)}
          </h3>
          <LinkButton
            to={makeUserPath({ username: seller })}
            className="text-sm inline-flex"
          >
            {seller}
          </LinkButton>
        </div>
      </div>
      <div className="help">{help}</div>
      <div>{actions}</div>
      {history}
    </div>
  );
}
