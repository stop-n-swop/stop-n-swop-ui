import React from 'react';
import { useCascade } from 'ui/hooks';
import { ListingsList } from 'ui/modules/listings/listings';
import { ListItem } from 'ui/elements/list';
import { LinkButton } from 'ui/elements/Button';
import { makeGameNewListingPath } from 'ui/constants/paths';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Listing from './Listing';
import type { Query } from '@respite/core';
import type { Listing as IListing } from '@sns/contracts/listing';
import type { User } from '@sns/contracts/user';

interface Props {
  user: User | null;
  listingsQuery: Query<IListing[]>;
  productId: string;
}

export default function Listings({
  listingsQuery: { data: listings },
  user,
  productId,
}: Props) {
  const cascade = useCascade(listings.length);
  const getMessage = useGetMessage();

  return (
    <ListingsList>
      <If condition={!listings.length}>
        <ListItem>
          <div className="w-full py-12 px-8 space-y-4 md:space-y-0 md:flex justify-between items-center">
            <span>{getMessage(ids.listings.empty.title)}</span>
            <LinkButton
              to={makeGameNewListingPath({ productId })}
              padding
              kind="primary"
            >
              {getMessage(ids.listings.empty.button)}
            </LinkButton>
          </div>
        </ListItem>
      </If>
      {listings.map((listing, i) => (
        <Listing
          key={listing.id}
          style={cascade(i)}
          listing={listing}
          owned={user?.username === listing.username}
        />
      ))}
    </ListingsList>
  );
}
