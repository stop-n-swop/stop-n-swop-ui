import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import type { Props } from './types';
import Button from './Button';

export default function LinkButton({ className, ...props }: Props) {
  return (
    <Button
      component={Link}
      padding={false}
      className={cx('font-normal', className)}
      {...props}
    />
  );
}
