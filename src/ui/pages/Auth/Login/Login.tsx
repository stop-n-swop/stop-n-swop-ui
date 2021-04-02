import React from 'react';
import background from 'ui/assets/bg-1.jpg';
import { FormProvider, useForm } from 'react-hook-form';
import { Status } from '@respite/core';
import Form from 'ui/modules/auth/login/Form';
import { Values } from '../../../modules/auth/login/types';

export default function Login({
  onSubmit,
  status,
}: {
  onSubmit(values: Values): Promise<void>;
  status: Status;
}) {
  const formProps = useForm<Values>({
    reValidateMode: 'onChange',
  });
  const { handleSubmit } = formProps;

  return (
    <FormProvider {...formProps}>
      <form
        className="relative overflow-y-hidden flex-grow flex flex-col md:justify-center md:items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className="h-screen w-screen left-0 absolute bg-center pointer-events-none bg-cover"
          style={{
            filter: 'blur(3px)',
            top: -45,
            backgroundImage: `url(${background})`,
            zIndex: 0,
          }}
        />
        <Form status={status} />
      </form>
    </FormProvider>
  );
}
