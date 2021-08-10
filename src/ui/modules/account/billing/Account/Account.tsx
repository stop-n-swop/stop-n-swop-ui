import React, { ReactNode, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'ui/intl';
import { ValidationError } from '@sns/abyss';
import { useUpdateUser } from 'application/user';
import Form from 'ui/modules/account/dashboard/Form';
import { ids } from 'ui/messages';
import Submit from 'ui/elements/Submit';
import FormError from 'ui/elements/FormError';
import { InputController } from 'ui/elements/Input';
import type { User } from '@sns/contracts/user';

interface Values {
  clientEmail: string;
}

export default function Account({
  onSubmit,
  title,
  description,
  submitText,
  user,
}: {
  title?: ReactNode;
  description: ReactNode;
  submitText: ReactNode;
  user: User;
  onSubmit?(): any;
}) {
  const formProps = useForm();
  const { setError } = formProps;
  const intl = useIntl();
  const getMessage = intl.message;
  const { action, error, status, reset } = useUpdateUser();

  const handleSubmit = async (values: Values) => {
    await action(values);
    onSubmit?.();
  };

  useEffect(() => {
    if (error instanceof ValidationError) {
      Object.entries(error.errors).forEach(([key, value]) => {
        setError(key, { type: 'api', message: value });
      });
    }
  }, [error, setError]);

  // TODO: paypal email address input isn't styled nicely

  return (
    <Form formProps={formProps} onSubmit={handleSubmit}>
      <If condition={title}>
        <h3 className="text-lg font-bold">{title}</h3>
      </If>
      <p className="text-sm text-gray-100 italic">{description}</p>
      <FormError error={error} />
      <div className="flex flex-col flex-grow items-center">
        <div className="my-4 w-full md:w-2/3">
          <InputController
            id="clientEmail"
            name="clientEmail"
            type="email"
            defaultValue={user.clientEmail ?? user.email}
            label={getMessage(ids.account.billing.account.clientEmail.label)}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Submit kind="primary" reset={reset} status={status}>
          {submitText}
        </Submit>
      </div>
    </Form>
  );
}
