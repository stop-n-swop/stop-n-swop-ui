import React, { useMemo, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useGetCurrency, useGetMessage } from 'ui/intl';
import { makeGamePath } from 'ui/constants/paths';
import Button from 'ui/elements/Button';
import { CurrencyInput } from 'ui/elements/Input';
import { ids } from 'ui/messages';
import useIsMounted from 'ui/hooks/useIsMounted';
import {
  Condition,
  getPlatformCharge,
  getProtectionCharge,
  getListingProfit,
  Region,
} from '@sns/contracts/listing';
import { Status } from '@sns/contracts/order';
import ProtectionModal from 'ui/modules/checkout/intro/ProtectionModal';
import Buttons from '../Buttons';
import type { Listing } from '@sns/contracts/listing';
import type { Values } from '../types';
import PlatformFeeModal from './PlatformFeeModal';

export default function PriceStep({
  previous,
  productId,
}: {
  productId: string;
  previous(): void;
}) {
  const [showProtectionModal, setShowProtectionModal] = useState(false);
  const [showPlatformFeeModal, setShowPlatformFeeModal] = useState(false);
  const getMessage = useGetMessage();
  const isMounted = useIsMounted();
  const getCurrency = useGetCurrency();
  const { control, getValues } = useFormContext<Values>();
  const values = getValues();
  const price = useWatch({
    control,
    name: 'price',
    defaultValue: values.price ?? 0,
  });
  const postage = useWatch({
    control,
    name: 'postage',
    defaultValue: values.postage ?? 0,
  });
  const currency = 'GBP';
  const listing = useMemo<Listing>(
    () => ({
      currency,
      postage,
      price,
      createdDate: new Date(),
      id: '',
      description: '',
      images: {},
      location: '',
      productIds: [],
      rating: 0,
      status: Status.OPEN,
      username: '',
      stats: {
        boxed: false,
        condition: Condition.MINT,
        instructions: false,
        region: Region.PAL,
      },
    }),
    [postage, price],
  );

  return (
    <div>
      <div className="flex">
        <Button
          kind="tertiary"
          component="a"
          target="_blank"
          href={makeGamePath({ productId })}
          padding={false}
          className="text-xs"
        >
          {getMessage(ids.listings.new.price.link)}
        </Button>
      </div>
      <div className="md:flex md:space-x-12 lg:space-x-0 lg:justify-around">
        <div className="mt-10 sm:w-2/3 lg:w-1/3 xl:w-1/4 space-y-4 mx-auto md:mx-0">
          <Controller
            name="price"
            rules={{
              validate: {
                required: (value) => {
                  if (!isMounted()) {
                    return true;
                  }
                  if (value) {
                    return true;
                  }
                  return getMessage(ids.listings.new.price.required);
                },
                min: (value) => {
                  if (!isMounted()) {
                    return true;
                  }
                  if (value < 500) {
                    return getMessage(ids.listings.new.price.min, {
                      min: getCurrency(500, { currency }),
                    });
                  }
                  return true;
                },
              },
            }}
            defaultValue=""
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CurrencyInput
                id="price"
                label={getMessage(ids.listings.new.price.label)}
                value={value ?? ''}
                state={error == null ? undefined : 'error'}
                onChange={onChange}
                autoFocus
                error={error}
                autoComplete="off"
              />
            )}
          />
          <Controller
            name="postage"
            rules={{
              validate: {
                required: (value) => {
                  if (!isMounted()) {
                    return true;
                  }
                  if (value || value === 0) {
                    return true;
                  }
                  return getMessage(ids.listings.new.price.required);
                },
              },
            }}
            defaultValue="0"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CurrencyInput
                id="postage"
                label={getMessage(ids.listings.new.price.postage)}
                value={value ?? ''}
                state={error == null ? undefined : 'error'}
                onChange={onChange}
                error={error}
                autoComplete="off"
              />
            )}
          />
        </div>
        <div className="lg:w-1/3 xl:w-1/4">
          <h2 className="pt-8 pb-4 font-semibold">
            {getMessage(ids.listings.new.price.breakdown.title)}
          </h2>
          <div className="flex flex-wrap text-sm">
            <span className="w-1/2">
              <Button
                className="font-normal"
                title={getMessage(ids.help.whatsThis)}
                padding={false}
                onClick={() => setShowPlatformFeeModal(true)}
              >
                {getMessage(ids.listings.new.price.breakdown.platform)}
              </Button>
            </span>
            <span className="w-1/2 text-right">
              {getCurrency(getPlatformCharge(listing), { currency })}
            </span>
            <span className="w-1/2">
              <Button
                className="font-normal"
                title={getMessage(ids.help.whatsThis)}
                padding={false}
                onClick={() => setShowProtectionModal(true)}
              >
                {getMessage(ids.listings.new.price.breakdown.protection)}
              </Button>
            </span>
            <span className="w-1/2 text-right">
              {getCurrency(getProtectionCharge(listing), { currency })}
            </span>
            <span className="w-1/2">
              {getMessage(ids.listings.new.price.breakdown.earnings)}
            </span>
            <span className="w-1/2 text-right">
              {getCurrency(getListingProfit(listing), { currency })}
            </span>
          </div>
        </div>
      </div>
      <Buttons previous={previous} />
      <ProtectionModal
        isOpen={showProtectionModal}
        onClose={() => setShowProtectionModal(false)}
      />
      <PlatformFeeModal
        isOpen={showPlatformFeeModal}
        onClose={() => setShowPlatformFeeModal(false)}
      />
    </div>
  );
}
