import React from 'react';
import { LinkButton } from 'ui/elements/Button';
import {
  makeDashboardPath,
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
        <p>{getMessage(ids.listings.new.done.description2)}</p>
        <p>
          {getMessage(ids.listings.new.done.description3[0])}
          <LinkButton
            kind="tertiary"
            className="inline-flex"
            to={makeMyListingPath({ listingId })}
          >
            {getMessage(ids.listings.new.done.description3[1])}
          </LinkButton>
          {getMessage(ids.listings.new.done.description3[2])}
        </p>
        <p>
          {getMessage(ids.listings.new.done.description4[0])}
          <LinkButton
            kind="tertiary"
            className="inline-flex"
            to={makeDashboardPath({
              section: 'billing',
              subSection: 'account',
            })}
          >
            {getMessage(ids.listings.new.done.description4[1])}
          </LinkButton>
          {getMessage(ids.listings.new.done.description4[2])}
          <LinkButton
            kind="tertiary"
            className="inline-flex"
            to={makeDashboardPath({ section: 'billing', subSection: 'verify' })}
          >
            {getMessage(ids.listings.new.done.description4[3])}
          </LinkButton>
          {getMessage(ids.listings.new.done.description4[4])}
        </p>
      </div>
      <div className="text-right mt-10 flex justify-between flex-col md:flex-row md:space-x-6">
        <LinkButton
          padding
          kind="primary"
          to={makeGameListingPath({ productId, listingId })}
        >
          {getMessage(ids.listings.new.done.viewListing)}
        </LinkButton>
        <LinkButton
          padding
          kind="secondary"
          to={makeMyListingPath({ listingId })}
        >
          {getMessage(ids.listings.new.done.manageListing)}
        </LinkButton>
        <LinkButton padding kind="tertiary" to={NEW_LISTING}>
          {getMessage(ids.listings.new.done.newListing)}
        </LinkButton>
      </div>
    </div>
  );
}
