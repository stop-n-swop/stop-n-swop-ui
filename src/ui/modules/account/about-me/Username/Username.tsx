import React, { ReactNode, useEffect, useMemo } from 'react';
import { InputController } from 'ui/elements/Input';
import { useForm } from 'react-hook-form';
import { useUpdateUser } from 'application/user';
import { useIntl } from 'ui/intl';
import { ids } from 'ui/messages';
import FormError from 'ui/elements/FormError';
import Submit from 'ui/elements/Submit';
import { UsernameNotUniqueError } from '@sns/abyss';
import Form from '../../dashboard/Form';
import type { User } from '@sns/contracts/user';

export default function Username({
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
  const { action, error: updateError, status, reset } = useUpdateUser();

  const handleSubmit = async (values: any) => {
    await action(values);
    onSubmit?.();
  };

  const error = useMemo(() => {
    if (updateError instanceof UsernameNotUniqueError) {
      return null;
    }
    return updateError;
  }, [updateError]);

  useEffect(() => {
    if (updateError instanceof UsernameNotUniqueError) {
      setError('username', { type: 'api', message: updateError.toString() });
    }
  }, [setError, updateError]);

  return (
    <Form formProps={formProps} onSubmit={handleSubmit}>
      <If condition={title}>
        <h3 className="text-lg font-bold">{title}</h3>
      </If>
      <p className="text-sm text-gray-100 italic">{description}</p>
      <FormError error={error} />
      <div className="flex flex-col flex-grow">
        <div className="flex-grow my-8 lg:my-20 w-full md:w-1/2 mx-auto">
          <InputController
            id="username"
            name="username"
            defaultValue={user.username ?? ''}
            label={getMessage(ids.account.aboutMe.username.username.label)}
            rules={{
              required: getMessage(
                ids.account.aboutMe.username.username.required,
              ),
              maxLength: {
                value: 20,
                message: getMessage(
                  ids.account.aboutMe.username.username.maxLength,
                  { maxLength: 20 },
                ),
              },
            }}
          />
        </div>
        <div className="flex justify-end">
          <Submit kind="primary" reset={reset} status={status}>
            {submitText}
          </Submit>
        </div>
      </div>
    </Form>
  );
}
