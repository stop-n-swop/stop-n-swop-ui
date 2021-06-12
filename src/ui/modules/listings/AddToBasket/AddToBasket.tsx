import React from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import { useGetMessage } from 'ui/intl';
import Button from 'ui/elements/Button';
import { ids } from 'ui/messages';
import { Status as ActionStatus } from '@respite/core';
import { Status } from '@sns/contracts/order';

const getButtonStatus = ({
  inBasket,
  owned,
  addStatus,
  listingStatus,
}: Pick<Props, 'inBasket' | 'owned' | 'addStatus' | 'listingStatus'>) => {
  if (inBasket) {
    return 'success';
  }
  if (owned) {
    return 'disabled';
  }
  if (listingStatus !== Status.OPEN) {
    return 'disabled';
  }
  if (addStatus === ActionStatus.LOADING) {
    return 'pending';
  }
  if (addStatus === ActionStatus.SUCCESS) {
    return 'success';
  }
  return 'none';
};

const getTitle = ({
  inBasket,
  owned,
  listingStatus,
}: Pick<Props, 'inBasket' | 'owned' | 'listingStatus'>) => {
  if (inBasket) {
    return 'This item is already in your basket';
  }
  if (owned) {
    return 'You own this listing';
  }
  if (listingStatus !== Status.OPEN) {
    return 'This listing is no longer available';
  }
  return undefined;
};

interface Props {
  addStatus: ActionStatus;
  inBasket: boolean;
  listingId: string;
  owned: boolean;
  listingStatus: Status;
  onAddToBasket({ listingId: string }): Promise<void>;
  className?: string;
}

export default function AddToBasket({
  addStatus,
  inBasket,
  listingId,
  listingStatus,
  onAddToBasket,
  owned,
  className,
}: Props) {
  const getMessage = useGetMessage();
  const state = getButtonStatus({ addStatus, inBasket, listingStatus, owned });
  const title = getTitle({ inBasket, listingStatus, owned });

  return (
    <Button
      kind="primary"
      className={className}
      state={state}
      onClick={() => onAddToBasket({ listingId })}
      title={title}
    >
      <FaShoppingBasket className="hidden md:block mr-3" />
      <span className="flex-shrink-0">
        {getMessage(ids.listings.listing.addToBasket)}
      </span>
    </Button>
  );
}
