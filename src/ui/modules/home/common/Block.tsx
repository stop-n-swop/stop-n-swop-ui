import React, { ReactNode } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  children: ReactNode;
}

export default function Block({ children, className }: Props) {
  return (
    <div
      className={cx(
        'rounded-lg',
        'bg-black py-8 space-y-4',
        'px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12',
        className,
      )}
    >
      {children}
    </div>
  );
}
