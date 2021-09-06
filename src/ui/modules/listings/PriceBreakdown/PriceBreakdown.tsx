import React, { useState } from 'react';
import { useGetCurrency, useGetMessage } from 'ui/intl';
import Button from 'ui/elements/Button';
import { ids } from 'ui/messages';
import {
  getPlatformCharge,
  getProtectionCharge,
  getListingProfit,
  getBasePrice,
  getListedPrice,
  // getPostage,
} from '@sns/contracts/listing';
import ProtectionModal from 'ui/modules/checkout/intro/ProtectionModal';
import { FaQuestionCircle } from 'react-icons/fa';
import type { Listing } from '@sns/contracts/listing';
import PlatformFeeModal from './PlatformFeeModal';

export default function PriceStep({
  listing,
  className,
}: {
  listing: Listing;
  className?: string;
}) {
  const [showProtectionModal, setShowProtectionModal] = useState(false);
  const [showPlatformFeeModal, setShowPlatformFeeModal] = useState(false);
  const getMessage = useGetMessage();
  const getCurrency = useGetCurrency();
  const { currency } = listing;

  return (
    <>
      <div className={className}>
        <h2 className="pb-2 mb-2 font-semibold flex border-b">
          <span className="w-1/2">
            {getMessage(ids.listings.new.price.breakdown.earnings)}
          </span>
          <span className="w-1/2 text-right">
            {getCurrency(Math.max(getListingProfit(listing), 0), {
              currency,
            })}
          </span>
        </h2>
        <div className="flex flex-wrap text-sm font-light">
          <span className="w-1/2">
            {getMessage(ids.listings.new.price.breakdown.price)}
          </span>
          <span className="w-1/2 text-right">
            {getCurrency(getBasePrice(listing), { currency })}
          </span>
          {/* <span className="w-1/2">
              {getMessage(ids.listings.new.price.breakdown.postage)}
            </span>
            <span className="w-1/2 text-right">
              {getCurrency(getPostage(listing), { currency })}
            </span> */}
          <span className="w-1/2">
            <Button
              className="font-light space-x-2"
              title={getMessage(ids.help.whatsThis)}
              padding={false}
              onClick={() => setShowPlatformFeeModal(true)}
            >
              <span>
                {getMessage(ids.listings.new.price.breakdown.platform)}
              </span>
              <FaQuestionCircle size="0.75em" />
            </Button>
          </span>
          <span className="w-1/2 text-right">
            {getCurrency(
              0 - (getListedPrice(listing) ? getPlatformCharge(listing) : 0),
              { currency },
            )}
          </span>
          <span className="w-1/2">
            <Button
              className="font-light space-x-2 "
              title={getMessage(ids.help.whatsThis)}
              padding={false}
              onClick={() => setShowProtectionModal(true)}
            >
              <span>
                {getMessage(ids.listings.new.price.breakdown.protection)}
              </span>
              <FaQuestionCircle size="0.75em" />
            </Button>
          </span>
          <span className="w-1/2 text-right">
            {getCurrency(0 - getProtectionCharge(listing), { currency })}
          </span>
        </div>
      </div>
      <ProtectionModal
        isOpen={showProtectionModal}
        onClose={() => setShowProtectionModal(false)}
      />
      <PlatformFeeModal
        isOpen={showPlatformFeeModal}
        onClose={() => setShowPlatformFeeModal(false)}
      />
    </>
  );
}
