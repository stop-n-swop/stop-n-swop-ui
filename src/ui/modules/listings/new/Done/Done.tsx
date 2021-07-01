import React from 'react';
import Button from 'ui/elements/Button';
import {
  makeGameListingPath,
  makeMyListingPath,
  MY_LISTINGS,
  NEW_LISTING,
} from 'ui/constants/paths';
import { Link } from 'react-router-dom';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';

export default function Done({
  productId,
  listingId,
}: {
  productId: string;
  listingId: string;
}) {
  const getMessage = useGetMessage();

  return (
    <div>
      <div className="flex flex-col my-12 space-y-8">
        <h4 className="text-lg font-semibold">
          {getMessage(ids.listings.new.done.subtitle)}
        </h4>
        <p>{getMessage(ids.listings.new.done.description)}</p>
        <p>{getMessage(ids.listings.new.done.description2)}</p>
        <p>
          {getMessage(ids.listings.new.done.description3[0])}
          <Button
            kind="tertiary"
            className="inline-flex"
            component={Link}
            padding={false}
            to={makeMyListingPath({ listingId })}
          >
            {getMessage(ids.listings.new.done.description3[1])}
          </Button>
          {getMessage(ids.listings.new.done.description3[2])}
        </p>
      </div>
      <div className="text-right mt-10 flex justify-between flex-col md:flex-row md:space-x-6">
        <Button
          kind="primary"
          component={Link}
          to={makeGameListingPath({ productId, listingId })}
        >
          {getMessage(ids.listings.new.done.viewListing)}
        </Button>
        <Button
          kind="secondary"
          component={Link}
          to={makeMyListingPath({ listingId })}
        >
          {getMessage(ids.listings.new.done.manageListing)}
        </Button>
        <Button kind="tertiary" component={Link} to={MY_LISTINGS}>
          {getMessage(ids.listings.new.done.listings)}
        </Button>

        <Button component={Link} to={NEW_LISTING}>
          {getMessage(ids.listings.new.done.newListing)}
        </Button>
      </div>
    </div>
  );
}
