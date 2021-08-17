import React from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import { useGetMessage } from 'ui/intl';
import { LinkButton } from 'ui/elements/Button';
import { ids } from 'ui/messages';
import { Status } from '@sns/contracts/order';
import { makeCheckoutPath, makeMyListingPath } from 'ui/constants/paths';

const getButtonStatus = ({ listingStatus }: Pick<Props, 'listingStatus'>) => {
  if (listingStatus !== Status.OPEN) {
    return 'disabled';
  }
  return 'none';
};

const getTitle = ({
  owned,
  listingStatus,
}: Pick<Props, 'owned' | 'listingStatus'>) => {
  if (owned) {
    return 'You own this listing';
  }
  if (listingStatus !== Status.OPEN) {
    return 'This listing is no longer available';
  }
  return undefined;
};

interface Props {
  listingId: string;
  owned: boolean;
  listingStatus: Status;
  className?: string;
}

export default function Purchase({
  listingId,
  listingStatus,
  owned,
  className,
}: Props) {
  const getMessage = useGetMessage();
  const state = getButtonStatus({ listingStatus });
  const title = getTitle({ listingStatus, owned });

  if (owned) {
    return (
      <LinkButton
        kind="secondary"
        className={className}
        to={makeMyListingPath({ listingId })}
        padding
        title={title}
      >
        {getMessage(ids.listings.listing.owned)}
      </LinkButton>
    );
  }

  if (state === 'disabled') {
    return null;
  }

  return (
    <LinkButton
      kind="primary"
      className={className}
      state={state}
      to={makeCheckoutPath({ listingId })}
      padding
      title={title}
    >
      <FaShoppingBasket className="hidden md:block mr-3" />
      <span className="flex-shrink-0">
        {getMessage(ids.listings.listing.purchase)}
      </span>
    </LinkButton>
  );
}
