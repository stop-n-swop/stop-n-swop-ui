import React, { useState, MouseEvent } from 'react';
import { Status as RStatus } from '@respite/core';
import { Order, Status } from '@sns/contracts/order';
import Button, { State } from 'ui/elements/Button';
import { Link } from 'react-router-dom';
import { makeEditListingPath } from 'ui/constants/paths';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { iconMatrix } from 'ui/modules/listings/utils';
import { FaPen } from 'react-icons/fa';
import type { Listing } from '@sns/contracts/listing';

export const makeGetButtonState =
  (active: Status, mutationStatus: RStatus) =>
  (buttonStatus: Status, defaultState: State = 'none'): State => {
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
  const handleClick =
    (status: Status) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setActive(status);
      onClick(status);
    };
  const getButtonState = makeGetButtonState(active, status);
  const getMessage = useGetMessage();

  const {
    id: listingId,
    products: [{ productId, platformId }],
  } = listing;

  if (order == null) {
    return (
      <>
        <Button
          className="w-full space-x-4"
          component={Link}
          to={makeEditListingPath({ productId, platformId, listingId })}
          kind="secondary"
        >
          <span>
            <FaPen />
          </span>
          <span>{getMessage(ids.listings.myListings.actions.edit)}</span>
        </Button>
        <Button
          className="w-full space-x-4"
          kind="tertiary"
          state={getButtonState(Status.CANCELLED, 'error')}
          onClick={handleClick(Status.CANCELLED)}
        >
          <span>
            <iconMatrix.cancelled />
          </span>
          <span>{getMessage(ids.listings.myListings.actions.cancel)}</span>
        </Button>
      </>
    );
  }
  if (order.status === Status.PAID) {
    return (
      <>
        <Button
          className="w-full space-x-4"
          kind="primary"
          state={getButtonState(Status.POSTED)}
          onClick={handleClick(Status.POSTED)}
        >
          <span>
            <iconMatrix.posted />
          </span>
          <span>{getMessage(ids.listings.myListings.actions.post)}</span>
        </Button>
      </>
    );
  }
  return null;
}
