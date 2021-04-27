import React from 'react';
import { InputController } from 'ui/elements/Input';
import { useForm } from 'react-hook-form';
import { useUpdateUser, useUser } from 'usecases/user';
import { useIntl } from 'ui/intl';
import { ids } from 'ui/messages';
import FormError from 'ui/elements/FormError';
import { getErrorMessage } from 'domain/selectors/common';
import Submit from 'ui/elements/Submit';
import Form from '../../dashboard/Form';

export default function Username() {
  const { data: user } = useUser();
  const formProps = useForm();
  const intl = useIntl();
  const getMessage = intl.message;
  const { action: handleSubmit, error, status, reset } = useUpdateUser();

  return (
    <Form formProps={formProps} onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold">
        {getMessage(ids.account.aboutMe.username.title)}
      </h3>
      <p className="text-sm text-gray-100 italic">
        {getMessage(ids.account.aboutMe.username.description)}
      </p>
      <FormError error={getErrorMessage(error, intl)} />
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
        <div>
          <Submit kind="primary" reset={reset} status={status}>
            {getMessage(ids.account.saveButton)}
          </Submit>
        </div>
      </div>
    </Form>
  );
}
