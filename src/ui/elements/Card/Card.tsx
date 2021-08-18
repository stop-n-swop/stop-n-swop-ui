import React, { forwardRef, ReactNode } from 'react';
import cx from 'classnames';

interface Props {
  padding?: string | boolean;
  className?: string;
  innerClassName?: string;
  title?: ReactNode;
  glass?: boolean;
  children: ReactNode;
}

export default forwardRef<HTMLDivElement, Props>(function Card(
  {
    title,
    padding = 'p-3 md:p-10',
    className,
    innerClassName,
    children,
    glass = true,
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        className,
        'bg-black rounded',
        glass && 'sm:bg-opacity-75 backdrop-filter backdrop-blur',
      )}
    >
      <If condition={title}>
        <div
          className={cx(
            'flex justify-between',
            'text-xl font-bold',
            'border-b-2 border-primary-lightest',
            'py-2 px-3 md:px-10 md:py-4 mb-3',
          )}
        >
          {title}
        </div>
      </If>
      <div className={cx(padding, innerClassName)}>{children}</div>
    </div>
  );
});
