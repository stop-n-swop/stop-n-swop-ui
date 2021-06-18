import React from 'react';
import { Controller } from 'react-hook-form';
import { useGetMessage } from 'ui/intl';
import { makeGamePath } from 'ui/constants/paths';
import Button from 'ui/elements/Button';
import { CurrencyInput } from 'ui/elements/Input';
import { ids } from 'ui/messages';
import useIsMounted from 'ui/hooks/useIsMounted';
import Buttons from '../Buttons';

export default function PriceStep({
  previous,
  productId,
}: {
  productId: string;
  previous(): void;
}) {
  const getMessage = useGetMessage();
  const isMounted = useIsMounted();

  return (
    <div>
      <h3 className="text-lg">{getMessage(ids.listings.new.price.title)}</h3>
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
      <div className="mt-10 sm:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto space-y-4">
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
                if (value) {
                  return true;
                }
                return getMessage(ids.listings.new.price.required);
              },
            },
          }}
          defaultValue=""
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CurrencyInput
              id="postage"
              label={getMessage(ids.listings.new.price.postage)}
              value={value ?? ''}
              state={error == null ? undefined : 'error'}
              onChange={onChange}
              error={error}
            />
          )}
        />
      </div>
      <Buttons previous={previous} />
    </div>
  );
}
