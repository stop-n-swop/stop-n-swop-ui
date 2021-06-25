import React, { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateUser, useUser } from 'application/user';
import FormError from 'ui/elements/FormError';
import Submit from 'ui/elements/Submit';
import Form from '../../dashboard/Form';
import AddressFields from './AddressFields';

export default function Address({
  title,
  description,
  submitText,
  onSubmit,
}: {
  title: ReactNode;
  description: ReactNode;
  submitText: ReactNode;
  onSubmit?(): any;
}) {
  const { data: user } = useUser();
  const { action, error, reset, status } = useUpdateUser();
  const handleSubmit = async (values: any) => {
    await action(values);
    onSubmit?.();
  };

  const formProps = useForm();

  return (
    <Form formProps={formProps} onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-100 italic">{description}</p>
      <FormError error={error} />
      <AddressFields address={user.address} />
      <div>
        <Submit status={status} reset={reset}>
          {submitText}
        </Submit>
      </div>
    </Form>
  );
}
