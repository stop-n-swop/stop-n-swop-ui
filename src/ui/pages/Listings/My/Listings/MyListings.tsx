import React from 'react';
import type { Listing as IListing } from '@sns/contracts/listing';
import Button from 'ui/elements/Button';
import { Link } from 'react-router-dom';
import { NEW_LISTING } from 'ui/constants/paths';
import PageTitle from 'ui/elements/PageTitle';
import { List } from 'ui/elements/list';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Listing from './ConnectedListing';

export default function MyListings({ listings }: { listings: IListing[] }) {
  const getMessage = useGetMessage();

  return (
    <div>
      <PageTitle>{getMessage(ids.listings.myListings.title)}</PageTitle>
      <div className="xl:w-4/5 xl:mx-auto">
        <div className="flex justify-end my-6">
          <Button kind="primary" component={Link} to={NEW_LISTING}>
            {getMessage(ids.listings.myListings.listButton)}
          </Button>
        </div>
        <List>
          {listings.map((listing) => (
            <Listing key={listing.listingId} listing={listing} />
          ))}
        </List>
      </div>
    </div>
  );
}
