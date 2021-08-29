import React, { ReactNode } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  children: ReactNode;
}

export default function BlockHeading({ className, children }: Props) {
  return <h2 className={cx('text-xl font-semibold', className)}>{children}</h2>;
}
