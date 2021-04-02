import React from 'react';
import { FaKey } from 'react-icons/fa';
import Button from 'ui/elements/Button';
import Input from 'ui/elements/Input';
import Card from 'ui/elements/Card';
import { REGISTER, FORGOT_PASSWORD } from 'ui/constants/paths';
import { Link } from 'react-router-dom';
import { Controller, useFormContext } from 'react-hook-form';
import FieldError from 'ui/elements/FieldError';
import { Status } from '@respite/core';
import { FormattedMessage, useIntl } from 'react-intl';
import { ids } from 'ui/messages';
import { getButtonState } from '../utils';

export default function LoginForm({ status }: { status: Status }) {
  const { errors } = useFormContext();
  const intl = useIntl();

  return (
    <Card className="flex-grow md:flex-grow-0 md:w-3/4 lg:w-1/2 xl:w-1/4 xl:mx-40">
      <div className="space-y-6 sm:w-3/4 sm:mx-auto md:space-y-12 md:w-full xl:space-y-12">
        <h1 className="text-2xl flex space-x-6 items-center justify-center">
          <FaKey />
          <span>
            <FormattedMessage id={ids.auth.login.title} />
          </span>
        </h1>
        <div className="lg:px-12 xl:px-0">
          <Controller
            name="username"
            defaultValue=""
            rules={{
              required: intl.formatMessage({
                id: ids.auth.login.username.required,
              }),
            }}
            render={({ ref, ...input }) => (
              <Input
                id="username"
                label={<FormattedMessage id={ids.auth.login.username.label} />}
                type="email"
                autoFocus
                autoComplete="username"
                {...input}
              />
            )}
          />
          <If condition={errors.username != null}>
            <FieldError error={errors.username} />
          </If>
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
            render={({ ref, ...input }) => (
              <Input
                id="password"
                label={<FormattedMessage id={ids.auth.login.password.label} />}
                type="password"
                autoComplete="current-password"
                {...input}
              />
            )}
          />
          <If condition={errors.password != null}>
            <FieldError error={errors.password} />
          </If>
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
