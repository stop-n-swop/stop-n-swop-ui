import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import FieldError from 'ui/elements/FieldError';
import Input from 'ui/elements/Input';
import { ids } from 'ui/messages';

export default function Email() {
  const intl = useIntl();
  const { errors } = useFormContext();

  return (
    <div className="lg:px-12 xl:px-0">
      <Controller
        name="email"
        defaultValue=""
        rules={{
          required: intl.formatMessage({
            id: ids.auth.register.email.required,
          }),
        }}
        render={({ ref, ...input }) => (
          <Input
            id="email"
            type="email"
            autoComplete="email"
            label={<FormattedMessage id={ids.auth.register.email.label} />}
            {...input}
          />
        )}
      />
      <If condition={errors.email != null}>
        <FieldError error={errors.email} />
      </If>
    </div>
  );
}
