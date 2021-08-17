import React, { ReactNode } from 'react';
import { FaLockOpen } from 'react-icons/fa';
import Card from 'ui/elements/Card';
import { useIntl } from 'ui/intl';
import { ids } from 'ui/messages';
import FormError from 'ui/elements/FormError';
import { BaseError } from '@sns/abyss';
import type { Reason } from 'domain/constants/auth';

export default function LoginForm({
  reason,
  error,
  children,
}: {
  reason: Reason;
  error: any;
  children: ReactNode;
}) {
  const intl = useIntl();

  return (
    <Card
      title={
        <div className="flex space-x-6 items-center">
          <FaLockOpen />
          <span>{intl.message(ids.auth.login.title)}</span>
        </div>
      }
      className="relative flex-grow md:flex-grow-0 w-full max-w-screen-xs"
    >
      <div className="space-y-6 sm:w-3/4 sm:mx-auto md:space-y-12 md:w-full xl:space-y-12 py-16">
        <If condition={Boolean(reason)}>
          <div className="lg:px-12 xl:px-0 text-center">
            {intl.message(ids.auth.levelUp.reason[reason])}
          </div>
        </If>
        <If condition={Boolean(error)}>
          <div className="lg:px-12 xl:px-0">
            <FormError
              error={
                error instanceof BaseError ? error.toString() : error?.message
              }
            />
          </div>
        </If>
        <div className="text-center">{children}</div>
      </div>
    </Card>
  );
}
