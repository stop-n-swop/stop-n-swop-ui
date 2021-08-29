import React, { useState } from 'react';
import Button from 'ui/elements/Button';
import { Link } from 'react-router-dom';
import { NEW_LISTING } from 'ui/constants/paths';
import PageTitle from 'ui/elements/PageTitle';
import { List } from 'ui/elements/list';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { useMyListings } from 'application/listings';
import { useAuthGuard } from 'application/auth';
import { sortBy } from 'crosscutting/utils';
import { Status } from '@sns/contracts/order';
import Toggle from 'ui/elements/Toggle';
import Listing from './Listing';

export default function MyListings() {
  useAuthGuard();
  const getMessage = useGetMessage();
  const { data: allListings } = useMyListings();

  const activeListings = allListings.filter((listing) => {
    return [Status.CLOSED, Status.COMPLETE].includes(listing.status) === false;
  });
  const hasInactive = allListings.length !== activeListings.length;
  const [showAll, setShowAll] = useState(
    () => hasInactive && activeListings.length === 0,
  );
  const listings = showAll ? allListings : activeListings;

  return (
    <div>
      <PageTitle>{getMessage(ids.listings.myListings.title)}</PageTitle>
      <div className="mx-auto container">
        <div className="flex justify-end my-6 space-x-8">
          <If condition={hasInactive}>
            <Toggle
              label={getMessage(ids.listings.myListings.showAll)}
              value={showAll}
              onChange={setShowAll}
            />
          </If>
          <Button kind="primary" component={Link} to={NEW_LISTING}>
            {getMessage(ids.listings.myListings.listButton)}
          </Button>
        </div>
        <List>
          {sortBy(listings, (listing) => listing.createdDate, false).map(
            (listing) => (
              <Listing key={listing.id} listing={listing} />
            ),
          )}
        </List>
      </div>
    </div>
  );
}
