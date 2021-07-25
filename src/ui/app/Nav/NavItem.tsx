import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { useBoop } from 'ui/hooks';
import { animated } from 'react-spring';
import type { IconType } from 'react-icons';

interface Props {
  styles?: Record<string, any>;
  forceIcon?: boolean;
  title?: string;
  to: string;
  Icon: IconType;
  children: ReactNode;
  onClose(): void;
}

export default function NavItem({
  styles,
  to,
  children,
  forceIcon,
  title,
  Icon,
  onClose,
}: Props) {
  const [style, boop] = useBoop({ rotation: 3, scale: 1.05 });

  return (
    <animated.li style={style} onMouseEnter={boop}>
      <Link
        title={title}
        to={to}
        className={cx({
          flex: true,
          'items-center': true,
          'space-x-3': true,
          'w-full': true,
          'px-4': true,
          'md:px-6': true,
          'py-3': true,
          'hover:text-primary-lighter': true,
          'md:transition-colors': true,
          'justify-start': true,
          'md:text-xs': true,
          // 'md:justify-center': true,
          ...styles,
        })}
        onClick={onClose}
      >
        <Icon className={cx(forceIcon || 'md:hidden')} size="1em" />
        <span>{children}</span>
      </Link>
    </animated.li>
  );
}
