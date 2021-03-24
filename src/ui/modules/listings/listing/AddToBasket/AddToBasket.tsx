import { Status } from 'core/constants/listings';
import React, { useState } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';
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

  return (
    <Button
      kind="primary"
      className={className}
      state={getButtonStatus(status)}
      onClick={handleAddToBasket}
    >
      <FaShoppingBasket className="md:hidden" />
      <span className="hidden sm:block sm:ml-2 md:ml-0">
        <FormattedMessage id={ids.listings.listing.addToBasket} />
      </span>
    </Button>
  );
}
