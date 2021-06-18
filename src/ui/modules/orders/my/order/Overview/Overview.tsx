import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { makeGameListingPath } from 'ui/constants/paths';
import Button from 'ui/elements/Button';
import Status from 'ui/modules/listings/my/listing/Status';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Order } from '@sns/contracts/order';
import type { Listing } from '@sns/contracts/listing';

interface Props {
  order: Order;
  listing: Listing;
  history: ReactNode;
  actions: ReactNode;
}

export default function Overview({
  actions,
  history,
  listing: {
    id: listingId,
    productIds: [productId],
  },
  order: { id: orderId, status },
}: Props) {
  const getMessage = useGetMessage();

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
          <Button
            component={Link}
            to={makeGameListingPath({
              listingId,
              productId,
            })}
            className="text-sm inline-flex"
            padding={false}
          >
            {listingId}
          </Button>
        </div>
      </div>
      <div className="space-y-8 lg:flex lg:space-y-0">
        <div className="lg:w-1/2">
          <Status status={status} />
        </div>
      </div>
      <div>{actions}</div>
      {history}
    </div>
  );
}
