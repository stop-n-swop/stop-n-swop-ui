import React from 'react';
import { useGetCurrency, useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Button from 'ui/elements/Button';
import {
  Listing,
  getFinalPrice,
  getBasePrice,
  getProtectionCharge,
  getPostage,
} from '@sns/contracts/listing';

export default function Price({
  listing,
  openProtectionModal,
}: {
  listing: Listing;
  openProtectionModal(): void;
}) {
  const getCurrency = useGetCurrency();
  const getMessage = useGetMessage();
  const { currency } = listing;
  const protectionAmount = getProtectionCharge(listing);
  const priceAmount = getBasePrice(listing) - protectionAmount;
  const postageAmount = getPostage(listing);
  const totalAmount = getFinalPrice(listing);

  return (
    <div className="flex flex-wrap">
      <span className="w-1/2">
        {getMessage(ids.checkout.intro.price.price)}
      </span>
      <span className="w-1/2 text-right">
        {getCurrency(priceAmount, { currency })}
      </span>
      <If condition={postageAmount}>
        <span className="w-1/2">
          {getMessage(ids.checkout.intro.price.postage)}
        </span>
        <span className="w-1/2 text-right">
          {getCurrency(postageAmount, { currency })}
        </span>
      </If>
      <span className="w-1/2">
        <Button
          title={getMessage(ids.help.whatsThis)}
          padding={false}
          onClick={openProtectionModal}
          className="font-normal"
        >
          {getMessage(ids.checkout.intro.price.protection)}
        </Button>
      </span>
      <span className="w-1/2 text-right">
        {getCurrency(protectionAmount, { currency })}
      </span>
      <hr className="border border-gray-500 w-full my-2" />
      <span className="w-1/2">
        {getMessage(ids.checkout.intro.price.total)}
      </span>
      <span className="w-1/2 text-right">
        {getCurrency(totalAmount, {
          currency,
        })}
      </span>
    </div>
  );
}
