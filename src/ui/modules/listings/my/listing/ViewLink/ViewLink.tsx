import React from 'react';
import { useMessage } from 'ui/intl';
import { Link } from 'react-router-dom';
import { makeGameListingPath } from 'ui/constants/paths';
import Button from 'ui/elements/Button';
import { ids } from 'ui/messages';

export default function ViewLink({
  productId,
  platformId,
  listingId,
}: {
  productId: string;
  platformId: string;
  listingId: string;
}) {
  return (
    <div className="flex">
      <Button
        padding={false}
        component={Link}
        to={makeGameListingPath({ productId, platformId, listingId })}
        kind="tertiary"
      >
        {useMessage(ids.listings.myListing.link)}
      </Button>
    </div>
  );
}
