import { Status } from 'domain/constants/basket';
import React, { useState } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import { useGetMessage } from 'ui/intl';
import Button from 'ui/elements/Button';
import { ids } from 'ui/messages';

const getButtonStatus = (status: Status) => {
  if (status === Status.ADDING_TO_BASKET) {
    return 'pending';
  }
  if (status === Status.IN_BASKET) {
    return 'success';
  }
  return 'none';
};

interface Props {
  // eslint-disable-next-line react/no-unused-prop-types
  productId: string;
  // eslint-disable-next-line react/no-unused-prop-types
  listingId: string;
  className?: string;
}

export default function AddToBasket({ className }: Props) {
  const [status, setStatus] = useState(Status.NONE);
  const handleAddToBasket = () => {
    setStatus(Status.ADDING_TO_BASKET);
    setTimeout(() => {
      setStatus(Status.IN_BASKET);
    }, 1000);
  };
  const getMessage = useGetMessage();

  return (
    <Button
      kind="primary"
      className={className}
      state={getButtonStatus(status)}
      onClick={handleAddToBasket}
    >
      <FaShoppingBasket className="hidden md:block mr-3" />
      <span className="flex-shrink-0">
        {getMessage(ids.listings.listing.addToBasket)}
      </span>
    </Button>
  );
}
