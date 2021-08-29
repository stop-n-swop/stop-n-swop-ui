import React from 'react';
import cx from 'classnames';
import type { Props } from './types';
import Button from './Button';

export default function AnchorButton({ className, ...props }: Props) {
  return (
    <Button
      component="a"
      padding={false}
      className={cx('font-normal', className)}
      {...props}
    />
  );
}
