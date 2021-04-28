import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons';
import cx from 'classnames';
import { useBoop } from 'ui/hooks';
import { animated } from 'react-spring';

interface Props {
  styles?: Record<string, any>;
  to: string;
  Icon: IconType;
  children: ReactNode;
  onClose(): void;
}

export default function NavItem({
  styles,
  to,
  children,
  Icon,
  onClose,
}: Props) {
  const [style, boop] = useBoop({ x: 3, rotation: 3 });

  return (
    <animated.li style={style} onMouseEnter={boop}>
      <Link
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
          'md:justify-center': true,
          ...styles,
        })}
        onClick={onClose}
      >
        <Icon className="md:hidden" />
        <span className="md:text-xs lowercase md:uppercase">{children}</span>
      </Link>
    </animated.li>
  );
}
