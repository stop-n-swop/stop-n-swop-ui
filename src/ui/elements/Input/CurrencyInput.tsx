import React, { ComponentProps } from 'react';
import { useGetCurrencySymbol } from 'ui/intl';
import cx from 'classnames';
import Cleave from 'cleave.js/react';
import Input, { Props } from './Input';

type Options = ComponentProps<typeof Cleave>['options'];

export default function CurrencyInput({
  className,
  value,
  onChange,
  ...props
}: Props) {
  const getCurrencySymbol = useGetCurrencySymbol();

  const options: Options = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    numericOnly: true,
    numeralDecimalScale: 2,
    prefix: getCurrencySymbol(),
    rawValueTrimPrefix: true,
  };

  return (
    <Input
      Component={Cleave}
      className={cx(className, 'text-right')}
      autoComplete="off"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      options={options}
      value={Number(value) / 100}
      onChange={(e) => {
        onChange?.({
          ...e,
          target: {
            ...e.target,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            value: e.target.rawValue * 100,
          },
        });
      }}
      {...props}
    />
  );
}
