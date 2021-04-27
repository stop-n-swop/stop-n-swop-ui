import type { Status } from '@sns/contracts/order';
import React from 'react';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';

export default function ListingStatus({ status }: { status: Status }) {
  const getMessage = useGetMessage();

  return (
    <div>
      <h3>{getMessage(ids.listings.myListing.status.label)}</h3>
      <div className="text-sm">
        {getMessage(ids.order.status[status] ?? ids.order.status.none)}
      </div>
    </div>
  );
}
