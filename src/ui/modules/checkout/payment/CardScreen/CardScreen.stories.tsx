import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Status as ActionStatus } from '@respite/core';
import { Provider as Intl } from 'ui/intl';
import { en } from 'ui/messages';
import type { User } from '@sns/contracts/user';
import CardScreen from './CardScreen';
import type { Listing } from '@sns/contracts/listing';

export default {
  title: 'modules / checkout / payment / CardScreen',
};

export const Basic = () => {
  const formProps = useForm();
  return (
    <Intl messages={en}>
      <FormProvider {...formProps}>
        <CardScreen
          listing={
            {
              currency: 'GBP',
              price: 10000,
              postage: 200,
            } as Listing
          }
          onSubmit={formProps.handleSubmit(() => null)}
          user={
            {
              firstName: 'Jack',
              lastName: 'Ellis',
            } as User
          }
          error={null}
          status={ActionStatus.IDLE}
        />
      </FormProvider>
    </Intl>
  );
};
