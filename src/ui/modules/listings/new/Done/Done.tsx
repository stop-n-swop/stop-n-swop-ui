import React from 'react';
import { LinkButton } from 'ui/elements/Button';
import {
  makeGameListingPath,
  makeMyListingPath,
  NEW_LISTING,
} from 'ui/constants/paths';
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

  // TODO: probably move all this text to a .mdx help file
  return (
    <div>
      <div className="flex flex-col my-12 space-y-8">
        <h4 className="text-lg font-semibold">
          {getMessage(ids.listings.new.done.subtitle)}
        </h4>
        <p>{getMessage(ids.listings.new.done.description)}</p>
        <p>
          {getMessage(ids.listings.new.done.description2[0])}
          <LinkButton
            kind="tertiary"
            className="inline-flex"
            to={makeMyListingPath({ listingId })}
          >
            {getMessage(ids.listings.new.done.description2[1])}
          </LinkButton>
          {getMessage(ids.listings.new.done.description2[2])}
        </p>
      </div>
      <div className="text-right mt-10 flex justify-around flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
        <LinkButton padding kind="secondary" to={NEW_LISTING}>
          {getMessage(ids.listings.new.done.newListing)}
        </LinkButton>
        <LinkButton
          padding
          kind="primary"
          to={makeGameListingPath({ productId, listingId })}
        >
          {getMessage(ids.listings.new.done.viewListing)}
        </LinkButton>
      </div>
    </div>
  );
}
