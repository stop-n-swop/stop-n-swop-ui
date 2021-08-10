import React from 'react';
import {
  FaMoneyBillWave,
  FaSignOutAlt,
  FaUserCheck,
  FaUserCircle,
} from 'react-icons/fa';
import cx from 'classnames';
import { useBoop } from 'ui/hooks';
import Button from 'ui/elements/Button';
import { useGetCurrency, useGetMessage } from 'ui/intl';
import { animated } from 'react-spring';
import { ids } from 'ui/messages';
import { LOGOUT, makeDashboardPath } from 'ui/constants/paths';
import { useUser } from 'application/user';
import { hasPayOutPermissions } from 'domain/selectors/user';
import { useBalance } from 'application/payments';
import { MIN_WITHDRAWAL_AMOUNT } from 'domain/constants/payments';
import NavItem from './NavItem';

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  onClose(): void;
}

export default function Account({ open, setOpen, onClose }: Props) {
  const [style, boop] = useBoop({ scale: 1.05, rotation: 10 });
  const { data: user } = useUser();
  const balanceQuery = useBalance();
  const g = useGetMessage();
  const getCurrency = useGetCurrency();

  return (
    <li>
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
          'md:absolute md:w-auto md:right-0 md:bg-gray-700 md:hover:bg-gray-600 md:z-10 md:top-full',
        )}
      >
        <If condition={user.username}>
          <li className="px-4 py-3 border-primary-lighter border-b border-t md:border-t-0 space-y-4">
            <div>{user.username}</div>
            <div className="text-xs font-thin">{user.email}</div>
          </li>
          <If
            condition={
              hasPayOutPermissions(user) || balanceQuery.data.balance > 0
            }
          >
            <NavItem
              forceIcon
              title="My balance"
              to="/my/balance"
              Icon={FaMoneyBillWave}
              onClose={() => setOpen(false)}
            >
              <div className="space-x-3 flex items-center">
                <span className="md:hidden">{g(ids.nav.account.balance)}</span>
                <span>
                  {getCurrency(balanceQuery.data.balance, {
                    currency: balanceQuery.data.currency,
                  })}
                </span>
                <If
                  condition={balanceQuery.data.balance >= MIN_WITHDRAWAL_AMOUNT}
                >
                  <span className="px-2 bg-secondary text-white rounded-lg">
                    {g(ids.nav.account.balancePill)}
                  </span>
                </If>
              </div>
            </NavItem>
          </If>
        </If>
        <NavItem
          forceIcon
          to={makeDashboardPath()}
          Icon={FaUserCheck}
          onClose={() => {
            setOpen(false);
            onClose();
          }}
        >
          {g(ids.nav.account.dashboard)}
        </NavItem>
        <NavItem
          forceIcon
          to={LOGOUT}
          Icon={FaSignOutAlt}
          onClose={() => {
            setOpen(false);
            onClose();
          }}
        >
          {g(ids.nav.account.logout)}
        </NavItem>
      </ul>
    </li>
  );
}
