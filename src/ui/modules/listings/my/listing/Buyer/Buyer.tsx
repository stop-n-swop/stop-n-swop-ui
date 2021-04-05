import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ids } from 'ui/messages';

export default function Buyer({ username }: { username: string }) {
  return (
    <div>
      <h3>
        <FormattedMessage id={ids.listings.myListing.buyer.label} />
      </h3>
      <div className="text-sm">{username}</div>
    </div>
  );
}
