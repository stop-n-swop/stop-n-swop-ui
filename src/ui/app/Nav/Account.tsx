import React from 'react';
import { FaUserCheck, FaUserCircle } from 'react-icons/fa';
import cx from 'classnames';
import { useBoop } from 'ui/hooks';
import Button from 'ui/elements/Button';
import { useMessage } from 'ui/intl';
import { animated } from 'react-spring';
import { ids } from 'ui/messages';
import { LOGOUT, makeDashboardPath } from 'ui/constants/paths';
import NavItem from './NavItem';

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export default function Account({ open, setOpen }: Props) {
  const [style, boop] = useBoop({ x: 3, rotation: 3 });

  return (
    <li onMouseEnter={boop}>
      <Button
        title="account"
        styles={{
          hidden: true,
          'md:flex': true,
          'justify-center': true,
          'items-center': true,
        }}
        style={{ paddingTop: 0, paddingBottom: 0, height: '100%' }}
        onClick={() => setOpen(!open)}
      >
        <animated.span style={style} onMouseEnter={boop}>
          <FaUserCircle size={25} />
        </animated.span>
      </Button>
      <ul
        className={cx(
          open ? '' : 'md:hidden',
          'md:absolute md:w-52 md:right-0 md:bg-gray-700 md:hover:bg-gray-600 md:z-10 md:top-full',
        )}
      >
        <NavItem
          to={makeDashboardPath()}
          Icon={FaUserCheck}
          onClose={() => setOpen(false)}
        >
          {useMessage(ids.nav.account.dashboard)}
        </NavItem>
        <NavItem to={LOGOUT} Icon={FaUserCircle} onClose={() => setOpen(false)}>
          {useMessage(ids.nav.account.logout)}
        </NavItem>
      </ul>
    </li>
  );
}
