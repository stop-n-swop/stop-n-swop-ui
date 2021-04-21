import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Login from 'ui/modules/auth/login/Login';
import LoginForm from 'ui/modules/auth/login/Form';
import type { Values } from 'ui/modules/auth/login/types';
import { useLogIn } from 'usecases/auth';
import { makeDashboardPath } from 'ui/constants/paths';
import { useQueryParam } from 'ui/hooks';
import { useHistory } from 'react-router-dom';

export default function LoginPage() {
  const redirect = useQueryParam('redirect') || makeDashboardPath();
  const { action: logIn, status, error } = useLogIn();
  const { push } = useHistory();
  const formProps = useForm<Values>({
    reValidateMode: 'onChange',
  });
  const { handleSubmit } = formProps;
  const onSubmit = async (values: Values) => {
    await logIn(values);

    push(redirect);
  };
  return (
    <FormProvider {...formProps}>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Login status={status} error={error} />
      </LoginForm>
    </FormProvider>
  );
}
