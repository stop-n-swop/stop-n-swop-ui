import React from 'react';
import { Controller, RegisterOptions } from 'react-hook-form';
import Checkbox, { Props } from './Checkbox';

export default function CheckboxController({
  name,
  rules,
  defaultValue,
  ...props
}: Omit<Props, 'value' | 'defaultValue'> & {
  name: string;
  rules?: RegisterOptions;
  defaultValue?: any;
  value?: any;
}) {
  return (
    <Controller
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { ref, ...input }, fieldState: { error } }) => (
        <Checkbox {...props} {...input} error={error} />
      )}
    />
  );
}
