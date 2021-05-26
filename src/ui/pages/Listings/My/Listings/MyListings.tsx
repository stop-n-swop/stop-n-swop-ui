import React from 'react';
import Button from 'ui/elements/Button';
import { Link } from 'react-router-dom';
import { NEW_LISTING } from 'ui/constants/paths';
import PageTitle from 'ui/elements/PageTitle';
import { List } from 'ui/elements/list';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { useMyListings } from 'application/listings';
import { useAuthGuard } from 'application/auth';
import Listing from './Listing';

export default function MyListings() {
  useAuthGuard();
  const getMessage = useGetMessage();
  const { data: listings } = useMyListings();

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
            <Listing key={listing.id} listing={listing} />
          ))}
        </List>
      </div>
    </div>
  );
}
