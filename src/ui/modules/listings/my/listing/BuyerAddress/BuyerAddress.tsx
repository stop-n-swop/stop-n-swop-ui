import { Status } from '@sns/contracts/order';
import React from 'react';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { useAddress } from 'application/listings';

interface Props {
  addressQuery: ReturnType<typeof useAddress>;
  status: Status;
}

export default function BuyerAddress({ addressQuery, status }: Props) {
  const getMessage = useGetMessage();

  if (status !== Status.PAID) {
    return null;
  }
  const {
    data: {
      name,
      address: { city, country, line1, line2, postcode },
    },
  } = addressQuery;

  return (
    <div>
      <div className="font-semibold">
        {getMessage(ids.listings.myListing.address.label)}
      </div>
      <dl className="text-sm">
        <dt>{name}</dt>
        <dt>{line1}</dt>
        <dt>{line2}</dt>
        <dt>{city}</dt>
        <dt>{postcode}</dt>
        <dt>{country}</dt>
      </dl>
    </div>
  );
}
