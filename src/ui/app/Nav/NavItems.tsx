import React, { useEffect, useRef } from 'react';
import {
  FaShoppingCart,
  FaSearch,
  FaListAlt,
  FaUserCircle,
  FaShippingFast,
} from 'react-icons/fa';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ids } from 'ui/messages';
import {
  CHECKOUT,
  LOGIN,
  MY_LISTINGS,
  MY_ORDERS,
  NEW_LISTING,
  PRODUCTS,
} from 'ui/constants/paths';
import NavItem from './NavItem';
import Account from './Account';

interface Props {
  open: boolean;
  accountOpen: boolean;
  loggedIn: boolean;
  close(): void;
  setAccountOpen: (v: boolean) => void;
}

export default function NavItems({
  loggedIn,
  open,
  close,
  accountOpen,
  setAccountOpen,
}: Props) {
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const fn = (e: any) => {
      if (open && !ref.current.contains(e.target)) {
        close();
      }
    };
    window.addEventListener('click', fn);

    return () => window.removeEventListener('click', fn);
  }, [close, open]);

  return (
    <ul
      ref={ref}
      className={cx(
        open ? '' : 'hidden',
        'items-center absolute z-30 bg-black w-full border-b border-green-700',
        'md:flex md:relative md:z-auto md:bg-transparent md:w-auto md:border-none',
      )}
    >
      <NavItem to={PRODUCTS} Icon={FaSearch} onClose={close}>
        <FormattedMessage id={ids.nav.browse} />
      </NavItem>
      <Choose>
        <When condition={loggedIn}>
          {/* <NavItem to={MY_COLLECTIONS} Icon={FaBoxOpen} onClose={close}>
            <FormattedMessage id={ids.nav.collections} />
          </NavItem> */}
          <NavItem to={MY_LISTINGS} Icon={FaListAlt} onClose={close}>
            <FormattedMessage id={ids.nav.listings} />
          </NavItem>
          <NavItem to={MY_ORDERS} Icon={FaShippingFast} onClose={close}>
            <FormattedMessage id={ids.nav.orders} />
          </NavItem>
        </When>
        <Otherwise>
          <NavItem Icon={FaListAlt} to={NEW_LISTING} onClose={close}>
            <FormattedMessage id={ids.nav.list} />
          </NavItem>
        </Otherwise>
      </Choose>
      <NavItem
        to={CHECKOUT}
        styles={{ hidden: true, 'md:flex': true }}
        Icon={FaShoppingCart}
        onClose={close}
      >
        <FormattedMessage id={ids.nav.basket} />
      </NavItem>
      <Choose>
        <When condition={loggedIn}>
          <Account open={accountOpen} setOpen={setAccountOpen} />
        </When>
        <Otherwise>
          <NavItem to={LOGIN} Icon={FaUserCircle} onClose={close}>
            <FormattedMessage id={ids.nav.account.login} />
          </NavItem>
        </Otherwise>
      </Choose>
    </ul>
  );
}
