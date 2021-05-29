import React from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import { useGetMessage } from 'ui/intl';
import Button from 'ui/elements/Button';
import { ids } from 'ui/messages';
import { Status } from '@respite/core';

const getButtonStatus = (status: Status, inBasket: boolean) => {
  if (inBasket) {
    return 'success';
  }
  if (status === Status.LOADING) {
    return 'pending';
  }
  if (status === Status.SUCCESS) {
    return 'success';
  }
  return 'none';
};

interface Props {
  status: Status;
  inBasket: boolean;
  listingId: string;
  onAddToBasket({ listingId: string }): Promise<void>;
  className?: string;
}

export default function AddToBasket({
  className,
  onAddToBasket,
  status,
  inBasket,
  listingId,
}: Props) {
  const getMessage = useGetMessage();
  const state = getButtonStatus(status, inBasket);

  return (
    <Button
      kind="primary"
      className={className}
      state={state}
      onClick={() => onAddToBasket({ listingId })}
      title={
        state === 'success' ? 'This item is already in your basket' : undefined
      }
    >
      <FaShoppingBasket className="hidden md:block mr-3" />
      <span className="flex-shrink-0">
        {getMessage(ids.listings.listing.addToBasket)}
      </span>
    </Button>
  );
}
