import React, { Fragment, ReactNode } from 'react';
import FieldError from 'ui/elements/FieldError';
import Input, { MaskedInput } from 'ui/elements/Input';

const slash = '/';

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
    <div>
      <MaskedInput
        groupLength={2}
        maxLength={4}
        onChange={onChange}
        value={value}
        className="items-end"
        render={({ first, index, last, onChange, ...props }) => (
          <Fragment key={index}>
            <div className="w-12">
              <Input
                id={`expiry_${index}`}
                autoComplete={first ? 'cc-exp' : undefined}
                label={first ? label : undefined}
                labelClassName="w-60"
                inputMode="numeric"
                placeholder={first ? 'MM' : 'YY'}
                className="text-center"
                hasError={!!error}
                onChange={(e) => {
                  if (e.target.value) {
                    if (first) {
                      // make sure you don't enter an invalid month (outside of 01 and 12)
                      const { value } = e.target;
                      const a = Number(value.charAt(0));
                      const b = Number(value.charAt(1) || '1');
                      if (a > 1) {
                        return;
                      }
                      if (a === 1 && b > 2) {
                        return;
                      }
                      if (a === 0 && b < 1) {
                        return;
                      }
                    }
                  }
                  onChange(e);
                }}
                {...props}
              />
            </div>
            <If condition={first}>
              <span>{slash}</span>
            </If>
          </Fragment>
        )}
      />
      <If condition={error}>
        <FieldError error={error} />
      </If>
    </div>
  );
}
