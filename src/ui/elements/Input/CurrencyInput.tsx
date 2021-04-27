import React, { useMemo, useState } from 'react';
import { useGetCurrency } from 'ui/intl';
import cx from 'classnames';
import Input, { Props } from './Input';

export default function CurrencyInput({
  value: actual,
  onFocus,
  onBlur,
  onChange,
  className,
  ...props
}: Props) {
  const [focused, setFocused] = useState(false);
  const getCurrency = useGetCurrency();
  const type = focused ? 'number' : 'text';
  const value = useMemo(() => {
    if (focused) {
      return actual;
    }
    if (actual == null || actual === '') {
      return '';
    }
    return getCurrency(Number(actual));
  }, [actual, focused, getCurrency]);

  return (
    <Input
      type={type}
      className={cx(className, 'text-right')}
      value={value}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      onChange={(e) => {
        if (e.target.value?.match(/\.(\d){3}/)) {
          e.target.value = e.target.value.replace(/\.(\d\d)\d+/, '.$1');
        }
        onChange?.(e);
      }}
      {...props}
    />
  );
}
