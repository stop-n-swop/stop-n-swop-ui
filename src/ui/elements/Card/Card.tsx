import React, { forwardRef, ReactNode } from 'react';
import cx from 'classnames';

interface Props {
  padding?: string | boolean;
  className?: string;
  title?: string | ReactNode;
  children: ReactNode;
}

export default forwardRef<HTMLDivElement, Props>(function Card(
  { title, padding = 'p-3 md:p-10', className, children },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        className,
        'bg-black sm:bg-opacity-75 rounded',
        'backdrop-filter backdrop-blur',
      )}
    >
      <If condition={title}>
        <div
          className={cx(
            'text-lg font-bold',
            'border-b-2 border-primary-lighter',
            'py-2 px-3 md:px-10 md:py-4 mb-3',
          )}
        >
          {title}
        </div>
      </If>
      <div className={cx(padding)}>{children}</div>
    </div>
  );
});
