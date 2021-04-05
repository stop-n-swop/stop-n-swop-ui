import { Status } from 'core/constants/order';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ids } from 'ui/messages';

export default function ListingStatus({ status }: { status: Status }) {
  return (
    <div>
      <h3>
        <FormattedMessage id={ids.listings.myListing.status.label} />
      </h3>
      <div className="text-sm">
        <FormattedMessage
          id={ids.order.status[status] ?? ids.order.status.none}
        />
      </div>
    </div>
  );
}
