import React from 'react';
import { Controller } from 'react-hook-form';
import { useGetMessage } from 'ui/intl';
import { Textarea } from 'ui/elements/Input';
import { ids } from 'ui/messages';
import Buttons from '../Buttons';

export default function DescriptionStep({ previous }: { previous(): void }) {
  const getMessage = useGetMessage();

  return (
    <div>
      <div className="sm:w-3/4 lg:w-1/2 sm:mx-auto">
        <Controller
          name="description"
          defaultValue=""
          rules={{
            maxLength: {
              value: 280,
              message: getMessage(
                ids.listings.new.description.description.maxLength,
              ),
            },
          }}
          render={({ field: { ref, ...input }, fieldState: { error } }) => (
            <Textarea
              id="description"
              label={getMessage(ids.listings.new.description.description.label)}
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
