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
import Toggle from 'ui/elements/Toggle';
import { isListingComplete } from 'domain/selectors/listings';
import Listing from './Listing';

export default function MyListings() {
  useAuthGuard();
  const getMessage = useGetMessage();
  const { data: allListings } = useMyListings();

  const activeListings = allListings.filter((listing) => {
    return !isListingComplete(listing);
  });
  const hasInactive = allListings.length !== activeListings.length;
  const [showAll, setShowAll] = useState(
    () => hasInactive && activeListings.length === 0,
  );
  const listings = showAll ? allListings : activeListings;

  return (
    <div>
      <PageTitle>{getMessage(ids.listings.myListings.title)}</PageTitle>
      <div className="mx-auto container space-y-4 sm:py-4 lg:pt-0">
        <div className="flex justify-between md:justify-end p-4 md:space-x-8 bg-black md:bg-transparent">
          <If condition={hasInactive}>
            <div className="flex items-center bg-black p-4 rounded bg-opacity-50">
              <Toggle
                label={getMessage(ids.listings.myListings.showAll)}
                value={showAll}
                onChange={setShowAll}
              />
            </div>
          </If>
          <Button kind="primary" component={Link} to={NEW_LISTING}>
            {getMessage(ids.listings.myListings.listButton)}
          </Button>
        </div>
        <List className="space-y-2 sm:space-y-4 lg:space-y-8">
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
