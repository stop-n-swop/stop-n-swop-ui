import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import FieldError from 'ui/elements/FieldError';
import Input from 'ui/elements/Input';
import { ids } from 'ui/messages';

export default function Username() {
  const intl = useIntl();
  const { errors } = useFormContext();

  return (
    <div className="lg:px-12 xl:px-0">
      <Controller
        name="username"
        defaultValue=""
        rules={{
          required: intl.formatMessage({
            id: ids.auth.register.username.required,
          }),
        }}
        render={({ ref, ...input }) => (
          <Input
            id="username"
            label={<FormattedMessage id={ids.auth.register.username.label} />}
            autoFocus
            {...input}
          />
        )}
      />
      <If condition={errors.username != null}>
        <FieldError error={errors.username} />
      </If>
    </div>
  );
}
