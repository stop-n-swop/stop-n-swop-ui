import React from 'react';
import cx from 'classnames';
import { InputController } from 'ui/elements/Input';
import { useForm } from 'react-hook-form';
import { useUpdateUser, useUser } from 'usecases/user';
import { useGetMessage, useIntl } from 'ui/intl';
import { ids } from 'ui/messages';
import { getErrorMessage } from 'domain/selectors/common';
import FormError from 'ui/elements/FormError';
import Submit from 'ui/elements/Submit';
import Form from '../../dashboard/Form';

export default function Address() {
  const intl = useIntl();
  const { data: user } = useUser();
  const { action: handleSubmit, error, reset, status } = useUpdateUser();
  const getMessage = useGetMessage();
  const required = getMessage(ids.error.required);

  const formProps = useForm();

  return (
    <Form formProps={formProps} onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold">
        {getMessage(ids.account.aboutMe.address.title)}
      </h3>
      <p className="text-sm text-gray-100 italic">
        {getMessage(ids.account.aboutMe.address.description)}
      </p>
      <FormError error={getErrorMessage(error, intl)} />
      <div
        className={cx(
          'sm:w-1/2 sm:mx-auto space-y-4 flex-grow',
          'lg:flex lg:flex-col lg:justify-center',
        )}
      >
        <div>
          <InputController
            id="address.line1"
            name="address.line1"
            label={getMessage(ids.account.aboutMe.address.line1.label)}
            defaultValue={user.address.line1 ?? ''}
            rules={{ required }}
          />
        </div>
        <div>
          <InputController
            id="address.line2"
            name="address.line2"
            label={getMessage(ids.account.aboutMe.address.line2.label)}
            defaultValue={user.address.line2 ?? ''}
          />
        </div>
        <div>
          <InputController
            id="address.city"
            name="address.city"
            label={getMessage(ids.account.aboutMe.address.city.label)}
            defaultValue={user.address.city ?? ''}
            rules={{ required }}
          />
        </div>
        <div>
          <InputController
            id="address.postcode"
            name="address.postcode"
            label={getMessage(ids.account.aboutMe.address.postcode.label)}
            defaultValue={user.address.postcode ?? ''}
            rules={{ required }}
          />
        </div>
        <div>
          <InputController
            id="address.country"
            name="address.country"
            label={getMessage(ids.account.aboutMe.address.country.label)}
            defaultValue={user.address.country ?? ''}
            rules={{ required }}
          />
        </div>
      </div>
      <div>
        <Submit status={status} reset={reset}>
          {getMessage(ids.account.saveButton)}
        </Submit>
      </div>
    </Form>
  );
}
