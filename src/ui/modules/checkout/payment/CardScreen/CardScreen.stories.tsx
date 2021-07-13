import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { User } from '@sns/contracts/user';
import CardScreen from './CardScreen';
import type { Listing } from '@sns/contracts/listing';

export default {
  title: 'modules / payment / CardScreen',
};

export const Basic = () => {
  const formProps = useForm();
  return (
    <FormProvider {...formProps}>
      <CardScreen
        listing={
          {
            currency: 'GBP',
            price: 10000,
          } as Listing
        }
        onSubmit={formProps.handleSubmit(() => null)}
        user={
          {
            firstName: 'Jack',
            lastName: 'Ellis',
          } as User
        }
      />
    </FormProvider>
  );
};
