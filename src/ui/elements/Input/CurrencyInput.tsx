import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
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
  const intl = useIntl();
  const type = focused ? 'number' : 'text';
  const value = useMemo(() => {
    if (focused) {
      return actual;
    }
    if (actual == null || actual === '') {
      return '';
    }
    return intl.formatNumber(Number(actual), {
      style: 'currency',
      currency: 'GBP',
    });
  }, [actual, focused, intl]);

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
