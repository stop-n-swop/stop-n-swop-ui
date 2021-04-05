import React, { useState, MouseEvent } from 'react';
import { Status as RStatus } from '@respite/core';
import { Order } from 'core/entity/orders';
import { Status } from 'core/constants/order';
import Button, { State } from 'ui/elements/Button';
import { Link } from 'react-router-dom';
import { makeEditListingPath } from 'ui/constants/paths';
import { Listing } from 'core/entity/listings';
import { FormattedMessage } from 'react-intl';
import { ids } from 'ui/messages';

const makeGetButtonState = (active: Status, mutationStatus: RStatus) => (
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

export default function Actions({
  listing,
  order,
  status,
  onClick,
}: {
  listing: Listing;
  order: Order;
  status: RStatus;
  onClick(status: Status): void;
}) {
  const [active, setActive] = useState<Status>();
  const handleClick = (status: Status) => (
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setActive(status);
    onClick(status);
  };
  const getButtonState = makeGetButtonState(active, status);

  const { listingId, productId } = listing;
  if (order == null) {
    return (
      <>
        <Button
          component={Link}
          to={makeEditListingPath({ productId, listingId })}
          kind="tertiary"
        >
          <FormattedMessage id={ids.listings.my.actions.edit} />
        </Button>
        <Button
          kind="tertiary"
          state={getButtonState(Status.CANCELLED, 'error')}
          onClick={handleClick(Status.CANCELLED)}
        >
          <FormattedMessage id={ids.listings.my.actions.cancel} />
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
          <FormattedMessage id={ids.listings.my.actions.post} />
        </Button>
        <Button
          kind="tertiary"
          state={getButtonState(Status.CANCELLED, 'error')}
          onClick={handleClick(Status.CANCELLED)}
        >
          <FormattedMessage id={ids.listings.my.actions.cancel} />
        </Button>
      </>
    );
  }
  return null;
}
