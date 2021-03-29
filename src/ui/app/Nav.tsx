import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaChevronDown,
  FaShoppingCart,
  FaSearch,
  FaListAlt,
  FaBoxOpen,
  FaUserCircle,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import cx from 'classnames';
import { useBoop } from 'ui/hooks';
import Button from 'ui/elements/Button';
import { FormattedMessage, useIntl } from 'react-intl';
import { animated } from 'react-spring';
import Logo from 'ui/assets/logo.png';
import { ids } from 'ui/messages';
import {
  CHECKOUT,
  HOME,
  LOGIN,
  LOGOUT,
  MY_COLLECTIONS,
  MY_LISTINGS,
  PRODUCTS,
} from 'ui/constants/paths';

const AnimatedLink = animated(Link);

const NavItem = ({
  styles,
  to,
  children,
  Icon,
}: {
  styles?: Record<string, any>;
  to: string;
  Icon: IconType;
  children: ReactNode;
}) => {
  const [style, boop] = useBoop({ x: 3, rotation: 3 });

  return (
    <animated.li style={style} onMouseEnter={boop}>
      <Button
        component={Link}
        to={to}
        className={cx({
          flex: true,
          'items-center': true,
          'space-x-3': true,
          'w-full': true,
          'px-4': true,
          'md:px-6': true,
          'py-3': true,
          'hover:text-gray-500': true,
          'md:transition-colors': true,
          ...styles,
        })}
      >
        <Icon className="md:hidden" />
        <span className="md:text-xs lowercase md:uppercase">{children}</span>
      </Button>
    </animated.li>
  );
};

const Account = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const [style, boop] = useBoop({ x: 3, rotation: 3 });

  return (
    <li style={style} onMouseEnter={boop}>
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
          'md:absolute md:w-52 md:right-0 md:bg-gray-700 md:hover:bg-gray-600',
        )}
      >
        <NavItem to={LOGOUT} Icon={FaUserCircle}>
          <FormattedMessage id={ids.nav.account.logout} />
        </NavItem>
      </ul>
    </li>
  );
};

const NavItems = ({
  open,
  accountOpen,
  setAccountOpen,
}: {
  open: boolean;
  accountOpen: boolean;
  setAccountOpen: (v: boolean) => void;
}) => {
  return (
    <ul className={cx(open ? '' : 'hidden', 'md:flex', 'items-center')}>
      <NavItem to={PRODUCTS} Icon={FaSearch}>
        <FormattedMessage id={ids.nav.browse} />
      </NavItem>
      <NavItem to={MY_COLLECTIONS} Icon={FaBoxOpen}>
        <FormattedMessage id={ids.nav.collections} />
      </NavItem>
      <NavItem to={MY_LISTINGS} Icon={FaListAlt}>
        <FormattedMessage id={ids.nav.listings} />
      </NavItem>
      <NavItem
        to={CHECKOUT}
        styles={{ hidden: true, 'md:flex': true }}
        Icon={FaShoppingCart}
      >
        <FormattedMessage id={ids.nav.basket} />
      </NavItem>
      <NavItem to={LOGIN} Icon={FaUserCircle}>
        <FormattedMessage id={ids.nav.account.login} />
      </NavItem>
      <Account open={accountOpen} setOpen={setAccountOpen} />
    </ul>
  );
};

const Title = () => {
  const [style, boop] = useBoop({ x: 3, rotation: 3 });

  return (
    <AnimatedLink
      style={style}
      onMouseEnter={boop}
      to={HOME}
      className="hover:text-gray-500 md:transition-colors"
    >
      <img src={Logo} className="w-48" alt="Stop n Swop" />
    </AnimatedLink>
  );
};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const intl = useIntl();

  return (
    <nav
      className="md:flex lg:px-4 border-b-2 border-gray-800 font-title bg-black"
      style={{ fontSize: 12 }}
    >
      <div className="flex items-center pl-3 md:flex-grow">
        <Title />
        <div className="flex-grow" />
        <Button
          title={intl.formatMessage({ id: ids.nav.basket })}
          component={Link}
          to={CHECKOUT}
          className="md:hidden"
        >
          <FaShoppingCart />
        </Button>
        <Button
          title={intl.formatMessage({ id: ids.nav.menu })}
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          <FaChevronDown
            className={cx(
              'transition-transform transform',
              open ? 'rotate-180' : 'rotate-0',
            )}
          />
        </Button>
      </div>
      <NavItems
        open={open}
        accountOpen={accountOpen}
        setAccountOpen={setAccountOpen}
      />
    </nav>
  );
}
