import React from 'react';
import FieldError from 'ui/elements/FieldError';
import Input from 'ui/elements/Input';
import type { Props } from 'ui/elements/Input/Input';

export default function SecurityInput({ error, ...props }: Props) {
  return (
    <div className="w-12">
      <Input
        className="text-center"
        labelClassName="w-60"
        placeholder="123"
        maxLength={3}
        minLength={3}
        inputMode="numeric"
        id="cvc"
        autoComplete="cc-csc"
        hasError={!!error}
        {...props}
      />
      <If condition={error}>
        <div className="w-60">
          <FieldError error={error} />
        </div>
      </If>
    </div>
  );
}
