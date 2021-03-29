import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import FieldError from 'ui/elements/FieldError';
import { Textarea } from 'ui/elements/Input';
import { ids } from 'ui/messages';
import Buttons from '../Buttons';

export default function DescriptionStep({ previous }: { previous(): void }) {
  const error = useFormContext().errors.description;

  return (
    <div>
      <h2 className="text-lg">
        <FormattedMessage id={ids.listings.new.description.title} />
      </h2>
      <div className="sm:w-3/4 lg:w-1/2 sm:mx-auto">
        <Controller
          name="description"
          defaultValue=""
          rules={{
            maxLength: {
              value: 280,
              message: 'Description must be no longer than a tweet',
            },
          }}
          render={({ ref, ...input }) => (
            <Textarea
              id="description"
              label={
                <FormattedMessage id={ids.listings.new.description.label} />
              }
              height={200}
              state={error == null ? undefined : 'error'}
              {...input}
            />
          )}
        />
        <FieldError error={error} />
      </div>
      <Buttons previous={previous} />
    </div>
  );
}
