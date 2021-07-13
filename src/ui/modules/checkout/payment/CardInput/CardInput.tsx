import React, { ReactNode, useMemo } from 'react';
import {
  FaCcAmex,
  FaCcDiscover,
  FaCcMastercard,
  FaCcVisa,
} from 'react-icons/fa';
import FieldError from 'ui/elements/FieldError';
import Input, { MaskedInput } from 'ui/elements/Input';

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
  const firstChar = value?.charAt(0) ?? '';

  const Icon = useMemo(() => {
    switch (firstChar) {
      case '3':
        return () => <FaCcAmex size="2em" />;
      case '4':
        return () => <FaCcVisa size="2em" />;
      case '5':
        return () => <FaCcMastercard size="2em" />;
      case '6':
        return () => <FaCcDiscover size="2em" />;
      default:
        return () => null;
    }
  }, [firstChar]);

  return (
    <div>
      <div className="flex items-end space-x-2">
        <MaskedInput
          onChange={onChange}
          value={value}
          groupLength={4}
          maxLength={16}
          render={({ first, index, last, ...props }) => {
            return (
              <div className="w-14 pr-1" key={index}>
                <Input
                  label={first ? label : undefined}
                  labelClassName="w-60"
                  className="text-center"
                  placeholder="0000"
                  id={`card_${index}`}
                  inputMode="numeric"
                  autoComplete={first ? 'cc-number' : undefined}
                  hasError={error}
                  {...props}
                />
              </div>
            );
          }}
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
