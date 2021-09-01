import React, { ReactNode } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  flush?: boolean;
  children: ReactNode;
}

export default function Block({ children, className, flush }: Props) {
  return (
    <div
      className={cx(
        flush || 'md:rounded-lg',
        'bg-black py-8 space-y-4',
        'px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12',
        className,
      )}
    >
      {children}
    </div>
  );
}
