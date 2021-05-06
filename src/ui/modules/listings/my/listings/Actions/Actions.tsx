import React, { useState, MouseEvent } from 'react';
import { Status as RStatus } from '@respite/core';
import { Order, Status } from '@sns/contracts/order';
import Button, { State } from 'ui/elements/Button';
import { Link } from 'react-router-dom';
import { makeEditListingPath } from 'ui/constants/paths';
import type { Listing } from '@sns/contracts/listing';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';

export const makeGetButtonState = (active: Status, mutationStatus: RStatus) => (
  buttonStatus: Status,
  defaultState: State = 'none',
): State => {
  if (active !== buttonStatus) {
    return defaultState;
  }
  if (mutationStatus === RStatus.LOADING) {
    return 'pending';
  }
  if (mutationStatus === RStatus.SUCCESS) {
    return 'success';
  }
  return defaultState;
};

interface Props {
  listing: Listing;
  order: Order;
  status: RStatus;
  onClick(status: Status): void;
}

export default function Actions({ listing, order, status, onClick }: Props) {
  const [active, setActive] = useState<Status>();
  const handleClick = (status: Status) => (
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setActive(status);
    onClick(status);
  };
  const getButtonState = makeGetButtonState(active, status);
  const getMessage = useGetMessage();

  const { listingId, productId, platformId } = listing;
  if (order == null) {
    return (
      <>
        <Button
          component={Link}
          to={makeEditListingPath({ productId, platformId, listingId })}
          kind="secondary"
        >
          {getMessage(ids.listings.myListings.actions.edit)}
        </Button>
        <Button
          kind="tertiary"
          state={getButtonState(Status.CANCELLED, 'error')}
          onClick={handleClick(Status.CANCELLED)}
        >
          {getMessage(ids.listings.myListings.actions.cancel)}
        </Button>
      </>
    );
  }
  if (order.status === Status.CREATED) {
    return null;
  }
  if (order.status === Status.SOLD) {
    return (
      <>
        <Button
          kind="primary"
          state={getButtonState(Status.POSTED)}
          onClick={handleClick(Status.POSTED)}
        >
          {getMessage(ids.listings.myListings.actions.post)}
        </Button>
        <Button
          kind="tertiary"
          state={getButtonState(Status.CANCELLED, 'error')}
          onClick={handleClick(Status.CANCELLED)}
        >
          {getMessage(ids.listings.myListings.actions.cancel)}
        </Button>
      </>
    );
  }
  return null;
}
