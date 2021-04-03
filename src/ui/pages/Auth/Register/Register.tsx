import React from 'react';
import { Status } from '@respite/core';
import { useForm } from 'react-hook-form';
import Buttons from 'ui/modules/auth/register/Buttons';
import Email from 'ui/modules/auth/register/Email';
import Form from 'ui/modules/auth/register/Form';
import Password from 'ui/modules/auth/register/Password';
import Username from 'ui/modules/auth/register/Username';

interface Props {
  status: Status;
  onSubmit(values: unknown): Promise<unknown>;
}

export default function Register({ status, onSubmit }: Props) {
  const formProps = useForm({
    reValidateMode: 'onChange',
  });

  return (
    <Form onSubmit={onSubmit} {...formProps}>
      <Username />
      <Email />
      <Password />
      <Buttons status={status} />
    </Form>
  );
}
