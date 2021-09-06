import React, { useMemo } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useGetCurrency, useGetMessage } from 'ui/intl';
import { CurrencyInput } from 'ui/elements/Input';
import { ids } from 'ui/messages';
import useIsMounted from 'ui/hooks/useIsMounted';
import { Condition, Region } from '@sns/contracts/listing';
import { Status } from '@sns/contracts/order';
import { useDebounce } from 'use-debounce';
import Buttons from '../Buttons';
import type { Listing } from '@sns/contracts/listing';
import type { Values } from '../types';
import PriceBreakdown from '../../PriceBreakdown';

export default function PriceStep({
  previous,
  productId: _productId,
}: {
  productId: string;
  previous(): void;
}) {
  const getMessage = useGetMessage();
  const isMounted = useIsMounted();
  const getCurrency = useGetCurrency();
  const { control, getValues } = useFormContext<Values>();
  const values = getValues();
  const [price] = useDebounce(
    useWatch({
      control,
      name: 'price',
      defaultValue: values.price ?? 0,
    }),
    500,
  );
  const postage = 0;
  // const postage = useWatch({
  //   control,
  //   name: 'postage',
  //   defaultValue: values.postage ?? 0,
  // });
  const currency = 'GBP';
  const listing = useMemo<Listing>(() => {
    return {
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
    };
  }, [postage, price]);

  return (
    <div>
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
                max: (value) => {
                  if (!isMounted()) {
                    return true;
                  }
                  if (value > 1000000) {
                    return getMessage(ids.listings.new.price.max, {
                      max: getCurrency(1000000, { currency }),
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
          {/* <Controller
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
          /> */}
        </div>
        <PriceBreakdown className="lg:w-1/3 xl:w-1/4 pt-8" listing={listing} />
      </div>
      <Buttons previous={previous} />
    </div>
  );
}
