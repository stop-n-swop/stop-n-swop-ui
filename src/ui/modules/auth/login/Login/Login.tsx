import React from 'react';
import { FaLockOpen } from 'react-icons/fa';
import Button from 'ui/elements/Button';
import Input from 'ui/elements/Input';
import Card from 'ui/elements/Card';
import { REGISTER, FORGOT_PASSWORD } from 'ui/constants/paths';
import { Link } from 'react-router-dom';
import { Controller, useFormContext } from 'react-hook-form';
import type { Status } from '@respite/core';
import { FormattedMessage, useIntl } from 'react-intl';
import { ids } from 'ui/messages';
import FormError from 'ui/elements/FormError';
import { getErrorMessage } from 'domain/selectors/common';
import { getButtonState } from '../utils';
import type { Values } from '../types';

export default function LoginForm({
  status,
  error,
}: {
  status: Status;
  error: any;
}) {
  const {
    formState: { errors },
  } = useFormContext<Values>();
  const intl = useIntl();

  return (
    <Card className="relative flex-grow md:flex-grow-0 md:w-3/4 lg:w-1/2 xl:w-1/4 xl:mx-40">
      <div className="space-y-6 sm:w-3/4 sm:mx-auto md:space-y-12 md:w-full xl:space-y-12">
        <h1 className="text-2xl flex space-x-6 items-center justify-center">
          <FaLockOpen />
          <span>
            <FormattedMessage id={ids.auth.login.title} />
          </span>
        </h1>
        <If condition={Boolean(error)}>
          <div className="lg:px-12 xl:px-0">
            <FormError error={getErrorMessage(error, intl)} />
          </div>
        </If>
        <div className="lg:px-12 xl:px-0">
          <Controller
            name="email"
            defaultValue=""
            rules={{
              required: intl.formatMessage({
                id: ids.auth.login.username.required,
              }),
            }}
            render={({ field: { ref, ...input } }) => (
              <Input
                id="email"
                type="email"
                label={<FormattedMessage id={ids.auth.login.username.label} />}
                autoFocus
                autoComplete="username"
                error={errors.email}
                {...input}
              />
            )}
          />
        </div>
        <div className="lg:px-12 xl:px-0">
          <Controller
            name="password"
            defaultValue=""
            rules={{
              required: intl.formatMessage({
                id: ids.auth.login.password.required,
              }),
            }}
            render={({ field: { ref, ...input } }) => (
              <Input
                id="password"
                label={<FormattedMessage id={ids.auth.login.password.label} />}
                type="password"
                autoComplete="current-password"
                error={errors.password}
                {...input}
              />
            )}
          />
        </div>
        <Button
          type="submit"
          kind="primary"
          state={getButtonState(status)}
          className="w-full md:w-1/2 md:mx-auto xl:px-20 xl:w-full"
        >
          <FormattedMessage id={ids.auth.login.buttons.submit} />
        </Button>
        <div className="flex flex-col text-sm space-y-6 sm:space-y-0 sm:flex-row xl:text-xs">
          <Button
            component={Link}
            to={REGISTER}
            kind="tertiary"
            className="sm:w-1/2"
          >
            <FormattedMessage id={ids.auth.login.buttons.register} />
          </Button>
          <Button
            component={Link}
            to={FORGOT_PASSWORD}
            kind="none"
            className="sm:w-1/2"
          >
            <FormattedMessage id={ids.auth.login.buttons.forgot} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
