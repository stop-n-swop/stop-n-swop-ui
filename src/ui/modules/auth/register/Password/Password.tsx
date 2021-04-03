import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import FieldError from 'ui/elements/FieldError';
import Input from 'ui/elements/Input';
import { ids } from 'ui/messages';

export default function Password() {
  const intl = useIntl();
  const { errors } = useFormContext();

  return (
    <div className="lg:px-12 xl:px-0">
      <Controller
        name="password"
        defaultValue=""
        rules={{
          required: intl.formatMessage({
            id: ids.auth.register.password.required,
          }),
        }}
        render={({ ref, ...input }) => (
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            label={<FormattedMessage id={ids.auth.register.password.label} />}
            {...input}
          />
        )}
      />
      <If condition={errors.password != null}>
        <FieldError error={errors.password} />
      </If>
    </div>
  );
}
