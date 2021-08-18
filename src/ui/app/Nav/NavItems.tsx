import React, { useEffect, useRef } from 'react';
import {
  FaSearch,
  FaListAlt,
  FaUserCircle,
  FaShippingFast,
  FaMoneyBillWave,
} from 'react-icons/fa';
import cx from 'classnames';
import { useGetCurrency, useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import {
  LOGIN,
  MY_LISTINGS,
  MY_ORDERS,
  NEW_LISTING,
  GAMES,
} from 'ui/constants/paths';
import { useBalance } from 'application/payments';
import { MIN_WITHDRAWAL_AMOUNT } from 'domain/constants/payments';
import NavItem from './NavItem';
import Account from './Account';
import Notices from './Notices';
import type { useMyListings } from 'application/listings';
import type { useMyOrders } from 'application/orders';

interface Props {
  open: boolean;
  accountOpen: boolean;
  loggedIn: boolean;
  close(): void;
  setAccountOpen: (v: boolean) => void;
  myListingsQuery: ReturnType<typeof useMyListings>;
  myOrdersQuery: ReturnType<typeof useMyOrders>;
}

export default function NavItems({
  loggedIn,
  open,
  close,
  accountOpen,
  setAccountOpen,
  myListingsQuery,
  myOrdersQuery,
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
  const getCurrency = useGetCurrency();
  const balanceQuery = useBalance();

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
        <When condition={loggedIn && myListingsQuery.data.length}>
          {/* <NavItem to={MY_COLLECTIONS} Icon={FaBoxOpen} onClose={close}>
            <FormattedMessage id={ids.nav.collections} />
          </NavItem> */}
          <NavItem to={MY_LISTINGS} Icon={FaListAlt} onClose={close}>
            {getMessage(ids.nav.listings)}
          </NavItem>
        </When>
        <Otherwise>
          <NavItem Icon={FaListAlt} to={NEW_LISTING} onClose={close}>
            {getMessage(ids.nav.list)}
          </NavItem>
        </Otherwise>
      </Choose>
      <If condition={loggedIn && myOrdersQuery.data.length}>
        <NavItem to={MY_ORDERS} Icon={FaShippingFast} onClose={close}>
          {getMessage(ids.nav.orders)}
        </NavItem>
      </If>
      <Choose>
        <When condition={loggedIn}>
          <NavItem
            forceIcon
            title="My balance"
            to="/my/balance"
            onClose={close}
            styles={{
              hidden: true,
              'md:flex': balanceQuery.data.balance > MIN_WITHDRAWAL_AMOUNT,
            }}
            Icon={FaMoneyBillWave}
          >
            <div className="space-x-3 flex items-center">
              <span>
                {getCurrency(balanceQuery.data.balance, {
                  currency: balanceQuery.data.currency,
                })}
              </span>
            </div>
          </NavItem>
          <Notices className="hidden md:block" />
          <Account
            balance={balanceQuery.data.balance}
            currency={balanceQuery.data.currency}
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
