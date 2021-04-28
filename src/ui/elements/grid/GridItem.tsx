import React, { ComponentType, CSSProperties, ReactNode } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  to?: string;
  component?: string | ComponentType<any>;
}

export default function GridItem({
  children,
  style,
  className,
  to,
  component: Component = 'div',
}: Props) {
  return (
    <li
      className={cx(
        'mb-2 flex justify-center',
        'md:w-1/2 md:mb-12 md:items-start',
        'lg:w-1/3',
        'xl:w-1/4',
        className,
      )}
      style={style}
    >
      <Component
        to={to}
        className={cx(
          'flex bg-black space-x-4 w-full h-full hover:bg-gray-800 hover:filter hover:contrast-125',
          'md:space-x-0 md:flex-col md:w-3/4',
          'lg:w-5/6',
        )}
      >
        {children}
      </Component>
    </li>
  );
}
