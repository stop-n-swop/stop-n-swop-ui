import React, { ComponentProps } from 'react';
import Input from 'ui/elements/Input';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Cleave from 'cleave.js/react';

type Options = ComponentProps<typeof Cleave>['options'];

const options: Options = {
  blocks: [2, 2, 2],
  delimiter: '-',
  numericOnly: true,
};

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
    <Input
      id="sortcode"
      value={value}
      onChange={(e) => {
        onChange((e.target as any).rawValue);
      }}
      error={error}
      label={getMessage(ids.account.billing.account.sortCode.label)}
      Component={Cleave}
      options={options}
    />
  );
}
