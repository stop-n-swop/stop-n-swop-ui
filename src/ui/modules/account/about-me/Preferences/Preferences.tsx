import React, { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateUser } from 'application/user';
import { useIntl } from 'ui/intl';
import { ids } from 'ui/messages';
import FormError from 'ui/elements/FormError';
import Submit from 'ui/elements/Submit';
import cx from 'classnames';
import { CheckboxController } from 'ui/elements/check';
import Form from '../../dashboard/Form';
import type { User } from '@sns/contracts/user';

export default function Preferences({
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
  const intl = useIntl();
  const getMessage = intl.message;
  const { action, error, status, reset } = useUpdateUser();

  const handleSubmit = async (values: any) => {
    await action(values);
    onSubmit?.();
  };

  return (
    <Form formProps={formProps} onSubmit={handleSubmit}>
      <If condition={title}>
        <h3 className="text-lg font-bold">{title}</h3>
      </If>
      <p className="text-sm text-gray-100 italic">{description}</p>
      <FormError error={error} />
      <div className="flex flex-col flex-grow">
        <div className={cx('flex-grow my-8 lg:my-20 w-full mx-auto')}>
          <CheckboxController
            name="preferences.noticeEmails"
            defaultValue={user.preferences.noticeEmails ?? true}
            label={getMessage(
              ids.account.aboutMe.preferences.noticeEmails.label,
            )}
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
