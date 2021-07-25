import React, { useEffect, useRef } from 'react';
import {
  FaSearch,
  FaListAlt,
  FaUserCircle,
  FaShippingFast,
} from 'react-icons/fa';
import cx from 'classnames';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import {
  LOGIN,
  MY_LISTINGS,
  MY_ORDERS,
  NEW_LISTING,
  GAMES,
} from 'ui/constants/paths';
import NavItem from './NavItem';
import Account from './Account';
import Notices from './Notices';

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
      if ((open || accountOpen) && !ref.current.contains(e.target)) {
        close();
        setAccountOpen(false);
      }
    };
    window.addEventListener('click', fn);

    return () => window.removeEventListener('click', fn);
  }, [accountOpen, close, open, setAccountOpen]);
  const getMessage = useGetMessage();

  return (
    <ul
      ref={ref}
      className={cx(
        open ? '' : 'hidden',
        'items-center absolute z-30 bg-black w-full border-b border-primary',
        'md:flex md:relative md:z-auto md:bg-transparent md:w-auto md:border-none',
      )}
    >
      <NavItem to={GAMES} Icon={FaSearch} onClose={close}>
        {getMessage(ids.nav.games)}
      </NavItem>
      <Choose>
        <When condition={loggedIn}>
          {/* <NavItem to={MY_COLLECTIONS} Icon={FaBoxOpen} onClose={close}>
            <FormattedMessage id={ids.nav.collections} />
          </NavItem> */}
          <NavItem to={MY_LISTINGS} Icon={FaListAlt} onClose={close}>
            {getMessage(ids.nav.listings)}
          </NavItem>
          <NavItem to={MY_ORDERS} Icon={FaShippingFast} onClose={close}>
            {getMessage(ids.nav.orders)}
          </NavItem>
        </When>
        <Otherwise>
          <NavItem Icon={FaListAlt} to={NEW_LISTING} onClose={close}>
            {getMessage(ids.nav.list)}
          </NavItem>
        </Otherwise>
      </Choose>
      <Choose>
        <When condition={loggedIn}>
          <Notices />
          <Account
            open={accountOpen}
            setOpen={setAccountOpen}
            onClose={close}
          />
        </When>
        <Otherwise>
          <NavItem to={LOGIN} Icon={FaUserCircle} onClose={close}>
            {getMessage(ids.nav.account.login)}
          </NavItem>
        </Otherwise>
      </Choose>
    </ul>
  );
}
