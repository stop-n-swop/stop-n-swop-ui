import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useGetMessage } from 'ui/intl';
import { Textarea } from 'ui/elements/Input';
import { ids } from 'ui/messages';
import Buttons from '../Buttons';

export default function DescriptionStep({ previous }: { previous(): void }) {
  const {
    formState: {
      errors: { description: error },
    },
  } = useFormContext();
  const getMessage = useGetMessage();

  return (
    <div>
      <h2 className="text-lg">
        {getMessage(ids.listings.new.description.title)}
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
          render={({ field: { ref, ...input } }) => (
            <Textarea
              id="description"
              label={getMessage(ids.listings.new.description.label)}
              height={200}
              error={error}
              {...input}
            />
          )}
        />
      </div>
      <Buttons previous={previous} />
    </div>
  );
}
