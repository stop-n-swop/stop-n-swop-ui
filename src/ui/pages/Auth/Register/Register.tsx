import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Buttons from 'ui/modules/auth/register/Buttons';
import Email from 'ui/modules/auth/register/Email';
import Form from 'ui/modules/auth/register/Form';
import Password from 'ui/modules/auth/register/Password';
import { useQueryParam } from 'ui/hooks';
import { makeDashboardPath } from 'ui/constants/paths';
import { useHistory } from 'react-router-dom';
import { useRegister } from 'usecases/user';
import type { Values } from 'ui/modules/auth/register/types';
import { CommonCode } from '@sns/contracts/common';

export default function Register() {
  const redirect = useQueryParam('redirect') || makeDashboardPath();
  const { push } = useHistory();
  const { action: register, status, error } = useRegister();

  const handleSubmit = async (values: Values) => {
    await register(values);
    push(redirect);
  };

  const formProps = useForm<Values>({
    reValidateMode: 'onChange',
  });

  const { setError } = formProps;

  useEffect(() => {
    if (error?.error?.code === CommonCode.VALIDATION && error.error.errors) {
      Object.entries(error.error.errors).forEach(([key, value]) => {
        setError(key as any, { type: 'custom', message: value as string });
      });
    }
  }, [error, setError]);

  return (
    <Form error={error} onSubmit={handleSubmit} {...formProps}>
      <Email />
      <Password />
      <Buttons status={status} />
    </Form>
  );
}
