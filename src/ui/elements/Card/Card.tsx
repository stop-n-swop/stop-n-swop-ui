import React, { forwardRef, ReactNode } from 'react';
import cx from 'classnames';

interface Props {
  padding?: string | boolean;
  className?: string;
  children: ReactNode;
}

export default forwardRef<HTMLDivElement, Props>(function Card(
  { padding = 'p-3 md:p-10', className, children },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(className, 'bg-black sm:bg-opacity-75 rounded', padding)}
      style={{ backdropFilter: 'blur(10px)' }}
    >
      {children}
    </div>
  );
});
