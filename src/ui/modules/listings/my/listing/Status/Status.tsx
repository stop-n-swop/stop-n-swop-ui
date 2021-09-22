import React from 'react';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { colorMatrix, iconMatrix } from 'ui/modules/listings/utils';
import type { Status } from '@sns/contracts/order';

const Unknown = () => null;

export default function ListingStatus({ status }: { status: Status }) {
  const getMessage = useGetMessage();
  const Icon = iconMatrix[status] ?? Unknown;
  const color = colorMatrix[status];

  return (
    <div>
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
  );
}
