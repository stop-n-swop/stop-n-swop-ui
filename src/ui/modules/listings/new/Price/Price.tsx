import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { makeProductPath } from 'ui/constants/paths';
import Button from 'ui/elements/Button';
import FieldError from 'ui/elements/FieldError';
import { CurrencyInput } from 'ui/elements/Input';
import { ids } from 'ui/messages';
import Buttons from '../Buttons';

export default function PriceStep({
  previous,
  productId,
}: {
  productId: string;
  previous(): void;
}) {
  const { errors } = useFormContext();
  const error = errors.price;
  const intl = useIntl();

  return (
    <div>
      <h3 className="text-lg">
        <FormattedMessage id={ids.listings.new.price.title} />
      </h3>
      <div className="flex">
        <Button
          kind="tertiary"
          component="a"
          target="_blank"
          href={makeProductPath({ productId })}
          padding={false}
          className="text-xs"
        >
          <FormattedMessage id={ids.listings.new.price.link} />
        </Button>
      </div>
      <div className="mt-10 sm:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
        <Controller
          name="price"
          rules={{
            required: intl.formatMessage({
              id: ids.listings.new.price.required,
            }),
          }}
          defaultValue=""
          render={({ value, onChange }) => (
            <CurrencyInput
              id="price"
              label={<FormattedMessage id={ids.listings.new.price.label} />}
              value={value ?? ''}
              state={error == null ? undefined : 'error'}
              onChange={onChange}
              autoFocus
            />
          )}
        />
        <FieldError error={error} />
      </div>
      <Buttons previous={previous} />
    </div>
  );
}
