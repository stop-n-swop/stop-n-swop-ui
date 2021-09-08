import React, { Suspense, useEffect, useRef } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import cx from 'classnames';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { LOGIN, GAMES } from 'ui/constants/paths';
import type { useBalance } from 'application/payments';
import NavItem from './NavItem';
import Account from './Account';
import Notices from './Notices';
import type { useMyListings } from 'application/listings';
import type { useMyOrders } from 'application/orders';
import ListNavItem from './ListNavItem';
import OrdersNavItem from './OrdersNavItem';
import BalanceNavItem from './BalanceNavItem';

interface Props {
  open: boolean;
  accountOpen: boolean;
  loggedIn: boolean;
  close(): void;
  setAccountOpen: (v: boolean) => void;
  myListingsQuery: ReturnType<typeof useMyListings>;
  myOrdersQuery: ReturnType<typeof useMyOrders>;
  balanceQuery: ReturnType<typeof useBalance>;
}

export default function NavItems({
  loggedIn,
  open,
  close,
  accountOpen,
  setAccountOpen,
  myListingsQuery,
  myOrdersQuery,
  balanceQuery,
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
      <Suspense fallback={null}>
        <ListNavItem
          close={close}
          loggedIn={loggedIn}
          myListingsQuery={myListingsQuery}
        />
      </Suspense>
      <Suspense fallback={null}>
        <OrdersNavItem
          close={close}
          loggedIn={loggedIn}
          myOrdersQuery={myOrdersQuery}
        />
      </Suspense>
      <Choose>
        <When condition={loggedIn}>
          <Suspense fallback={null}>
            <BalanceNavItem balanceQuery={balanceQuery} close={close} />
          </Suspense>
          <Suspense fallback={null}>
            <Notices className="hidden md:block" />
          </Suspense>
          <Suspense fallback={null}>
            <Account
              balanceQuery={balanceQuery}
              open={accountOpen}
              setOpen={setAccountOpen}
              onClose={close}
            />
          </Suspense>
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
