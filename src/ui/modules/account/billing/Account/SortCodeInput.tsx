import React, { Fragment } from 'react';
import FieldError from 'ui/elements/FieldError';
import Input, { MaskedInput } from 'ui/elements/Input';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';

const dash = '-';

export default function SortCodeInput({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange(value: any): void;
  error?: any;
}) {
  const getMessage = useGetMessage();

  return (
    <div>
      <MaskedInput
        groupLength={2}
        maxLength={6}
        onChange={onChange}
        value={value}
        render={({ first, index, last, ...props }) => (
          <Fragment key={index}>
            <div className="w-8">
              <Input
                id={`sortcode_${index}`}
                label={
                  first
                    ? getMessage(ids.account.billing.account.sortCode.label)
                    : undefined
                }
                labelClassName="w-60"
                className="text-center"
                placeholder="00"
                inputMode="numeric"
                hasError={!!error}
                {...props}
              />
            </div>
            <If condition={!last}>
              <span className="pt-6">{dash}</span>
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
