import { useMyListings } from 'application/listings';
import {
  doesListingHaveActions,
  isListingInProgress,
  isListingOpen,
} from 'domain/selectors/listings';
import React from 'react';
import { makeMyListingPath, MY_LISTINGS } from 'ui/constants/paths';
import { LinkButton } from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Panel from 'ui/modules/home/existing/Panel';

export default function ListingsPanel() {
  const { data: allListings } = useMyListings();
  const g = useGetMessage();
  if (allListings.length === 0) {
    return null;
  }
  const openCount = allListings.filter((listing) =>
    isListingOpen(listing),
  ).length;
  const progressCount = allListings.filter((listing) =>
    isListingInProgress(listing),
  ).length;
  const actionCount = allListings.filter((listing) =>
    doesListingHaveActions(listing),
  ).length;
  const actionListingId = allListings.find((listing) =>
    doesListingHaveActions(listing),
  )?.id;

  return (
    <Panel
      title={g(ids.home.existing.listings.title)}
      ctas={
        <LinkButton kind="primary" padding to={MY_LISTINGS}>
          {g(ids.home.existing.listings.cta)}
        </LinkButton>
      }
    >
      <div>{g(ids.home.existing.listings.open, { count: openCount })}</div>
      <div>
        {g(ids.home.existing.listings.progress, { count: progressCount })}
      </div>
      <div>
        <Choose>
          <When condition={actionCount === 1}>
            <LinkButton
              kind="tertiary"
              to={makeMyListingPath({
                listingId: actionListingId,
              })}
            >
              {g(ids.home.existing.listings.action, { count: actionCount })}
            </LinkButton>
          </When>
          <When condition={actionCount > 1}>
            <LinkButton kind="tertiary" to={MY_LISTINGS}>
              {g(ids.home.existing.listings.action, { count: actionCount })}
            </LinkButton>
          </When>
        </Choose>
      </div>
    </Panel>
  );
}
