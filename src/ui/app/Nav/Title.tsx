import React from 'react';
import { Link } from 'react-router-dom';
import { useBoop } from 'ui/hooks';
import { HOME } from 'ui/constants/paths';
import Logo from './Logo';

export default function Title() {
  const [style, boop] = useBoop({ x: 3, rotation: 3 });

  return (
    <Link
      style={style}
      onMouseEnter={boop}
      to={HOME}
      className="hover:text-gray-500 md:transition-colors text-lg"
      title="home"
    >
      <Logo />
    </Link>
  );
}
