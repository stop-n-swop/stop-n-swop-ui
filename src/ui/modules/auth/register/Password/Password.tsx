import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import Input from 'ui/elements/Input';
import { ids } from 'ui/messages';

export default function Password() {
  const intl = useIntl();
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="lg:px-12 xl:px-0">
      <Controller
        name="password"
        defaultValue=""
        rules={{
          required: intl.formatMessage({
            id: ids.auth.register.password.required,
          }),
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
            message: intl.formatMessage({
              id: ids.auth.register.password.pattern,
            }),
          },
        }}
        render={({ field: { ref, ...input } }) => (
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            label={<FormattedMessage id={ids.auth.register.password.label} />}
            error={errors.password}
            {...input}
          />
        )}
      />
    </div>
  );
}
