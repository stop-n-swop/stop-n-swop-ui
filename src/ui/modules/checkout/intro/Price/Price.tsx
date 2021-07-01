import React from 'react';
import { useGetCurrency, useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Button from 'ui/elements/Button';
import {
  Listing,
  getProtectionCost,
  getFinalPrice,
  getBasePrice,
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
  const priceAmount = getBasePrice(listing);
  const postageAmount = getPostage(listing);
  const { currency } = listing;
  const protectionAmount = getProtectionCost(listing);
  const totalAmount = getFinalPrice(listing);

  return (
    <div className="flex flex-wrap">
      <span className="w-1/2">
        {getMessage(ids.checkout.intro.price.price)}
      </span>
      <span className="w-1/2 text-right">
        {getCurrency(priceAmount, { currency })}
      </span>
      <span className="w-1/2">
        <Button
          title={getMessage(ids.help.whatsThis)}
          padding={false}
          onClick={openProtectionModal}
        >
          {getMessage(ids.checkout.intro.price.protection)}
        </Button>
      </span>
      <span className="w-1/2 text-right">
        {getCurrency(protectionAmount, { currency })}
      </span>
      <If condition={postageAmount}>
        <span className="w-1/2">
          {getMessage(ids.checkout.intro.price.postage)}
        </span>
        <span className="w-1/2 text-right">
          {getCurrency(postageAmount, { currency })}
        </span>
      </If>
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
