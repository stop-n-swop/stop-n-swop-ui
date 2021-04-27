import React from 'react';
import { useMessage } from 'ui/intl';
import { Link } from 'react-router-dom';
import { makeProductListingPath } from 'ui/constants/paths';
import Button from 'ui/elements/Button';
import { ids } from 'ui/messages';

export default function ViewLink({ productId, listingId }) {
  return (
    <div className="flex">
      <Button
        padding={false}
        component={Link}
        to={makeProductListingPath({ productId, listingId })}
        kind="tertiary"
      >
        {useMessage(ids.listings.myListing.link)}
      </Button>
    </div>
  );
}
