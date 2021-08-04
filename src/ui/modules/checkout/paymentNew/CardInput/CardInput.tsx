import React, { ComponentProps, ReactNode, useMemo, useState } from 'react';
import {
  FaCcAmex,
  FaCcDiscover,
  FaCcMastercard,
  FaCcVisa,
} from 'react-icons/fa';
import Input from 'ui/elements/Input';
import Cleave from 'cleave.js/react';
import FieldError from 'ui/elements/FieldError';

type Options = ComponentProps<typeof Cleave>['options'];

export default function CardInput({
  value,
  onChange,
  error,
  label,
}: {
  value: string;
  onChange(value: any): void;
  label: ReactNode;
  error?: any;
}) {
  const [type, setType] = useState('unknown');

  const Icon = useMemo(() => {
    switch (type) {
      case 'amex':
        return () => <FaCcAmex size="2em" />;
      case 'visa':
        return () => <FaCcVisa size="2em" />;
      case 'mastercard':
        return () => <FaCcMastercard size="2em" />;
      case 'discover':
        return () => <FaCcDiscover size="2em" />;
      default:
        return () => null;
    }
  }, [type]);

  const options: Options = {
    creditCard: true,
    onCreditCardTypeChanged: setType,
  };

  return (
    <div>
      <div className="flex items-end space-x-2">
        <Input
          Component={Cleave}
          label={label}
          id="card"
          inputMode="numeric"
          autoComplete="cc-number"
          hasError={!!error}
          value={value}
          onChange={(e) => {
            onChange((e.target as any).rawValue);
          }}
          options={options}
        />
        <div className="pl-2">
          <Icon />
        </div>
      </div>
      <If condition={error}>
        <FieldError error={error} />
      </If>
    </div>
  );
}
