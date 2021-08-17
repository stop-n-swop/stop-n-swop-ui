import React, { ComponentProps } from 'react';
import { useGetCurrencySymbol } from 'ui/intl';
import cx from 'classnames';
import Cleave from 'cleave.js/react';
import Input, { Props } from './Input';

type Options = ComponentProps<typeof Cleave>['options'];

export default function CurrencyInput({
  className,
  value: actual,
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
    noImmediatePrefix: true,
  };

  const value = (() => {
    if (actual) {
      return Number(actual) / 100;
    }
    return actual;
  })();

  return (
    <Input
      Component={Cleave}
      className={cx(className, 'text-right')}
      autoComplete="off"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      options={options}
      value={value}
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
