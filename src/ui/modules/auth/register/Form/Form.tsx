import { getErrorMessage } from 'domain/selectors/common';
import React, { ReactNode } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { FaKey } from 'react-icons/fa';
import { FormattedMessage, useIntl } from 'react-intl';
import background from 'ui/assets/bg-1.jpg';
import Card from 'ui/elements/Card';
import FormError from 'ui/elements/FormError';
import { ids } from 'ui/messages';
import type { Values } from '../types';

interface Props extends UseFormReturn<Values> {
  onSubmit(values: Values): Promise<unknown>;
  error: any;
  children: ReactNode;
}

export default function Form({
  onSubmit,
  children,
  error,
  ...formProps
}: Props) {
  const { handleSubmit } = formProps;
  const intl = useIntl();

  return (
    <FormProvider {...formProps}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative overflow-y-hidden flex-grow flex flex-col md:justify-center md:items-center"
      >
        {/* TODO: we've done this 3 times now, make it a common module */}
        <div
          className="h-screen w-screen left-0 absolute bg-center pointer-events-none bg-cover"
          style={{
            filter: 'blur(3px)',
            top: -45,
            backgroundImage: `url(${background})`,
            zIndex: 0,
          }}
        />
        <Card className="relative flex-grow md:flex-grow-0 md:w-3/4 lg:w-1/2 xl:w-1/4 xl:mx-40">
          <div className="space-y-6 sm:w-3/4 sm:mx-auto md:space-y-12 md:w-full xl:space-y-12">
            <h1 className="text-2xl flex space-x-6 items-center justify-center">
              <FaKey />
              <span>
                <FormattedMessage id={ids.auth.register.title} />
              </span>
            </h1>
            <If condition={Boolean(error)}>
              <div className="lg:px-12 xl:px-0">
                <FormError error={getErrorMessage(error, intl)} />
              </div>
            </If>
            {children}
          </div>
        </Card>
      </form>
    </FormProvider>
  );
}
