import React, { ComponentProps, ReactNode } from 'react';
import Input from 'ui/elements/Input';
import Cleave from 'cleave.js/react';

type Options = ComponentProps<typeof Cleave>['options'];

const options: Options = {
  date: true,
  datePattern: ['m', 'y'],
};

export default function ExpiryInput({
  value,
  onChange,
  error,
  label,
}: {
  value: string;
  onChange(value: string): void;
  label: ReactNode;
  error?: any;
}) {
  return (
    <Input
      Component={Cleave}
      id="expiry"
      autoComplete="cc-exp"
      label={label}
      inputMode="numeric"
      error={error}
      containerClassName="w-20"
      placeholder="MM/YY"
      value={value}
      onChange={(e) => {
        const value = (e.target as any).rawValue;
        onChange?.(value);
      }}
      options={options}
    />
  );
}
