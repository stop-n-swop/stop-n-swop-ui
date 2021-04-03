import React, { ReactNode } from 'react';
import { FormProvider, UseFormMethods } from 'react-hook-form';
import { FaKey } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';
import background from 'ui/assets/bg-1.jpg';
import Card from 'ui/elements/Card';
import { ids } from 'ui/messages';

interface Props extends UseFormMethods {
  onSubmit(values: unknown): Promise<unknown>;
  children: ReactNode;
}

export default function Form({ onSubmit, children, ...formProps }: Props) {
  const { handleSubmit } = formProps;
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
        <Card className="flex-grow md:flex-grow-0 md:w-3/4 lg:w-1/2 xl:w-1/4 xl:mx-40">
          <div className="space-y-6 sm:w-3/4 sm:mx-auto md:space-y-12 md:w-full xl:space-y-12">
            <h1 className="text-2xl flex space-x-6 items-center justify-center">
              <FaKey />
              <span>
                <FormattedMessage id={ids.auth.register.title} />
              </span>
            </h1>
            {children}
          </div>
        </Card>
      </form>
    </FormProvider>
  );
}
