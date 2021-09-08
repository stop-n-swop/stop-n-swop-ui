import React from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';
import { useGetCurrency } from 'ui/intl';
import { MIN_WITHDRAWAL_AMOUNT } from 'domain/constants/payments';
import type { useBalance } from 'application/payments';
import NavItem from './NavItem';

interface Props {
  close(): void;
  balanceQuery: ReturnType<typeof useBalance>;
}

export default function BalanceNavItem({ close, balanceQuery }: Props) {
  const getCurrency = useGetCurrency();
  const {
    data: { balance, currency },
  } = balanceQuery;

  return (
    <NavItem
      forceIcon
      title="My balance"
      to="/my/balance"
      onClose={close}
      styles={{
        hidden: true,
        'md:flex': balance > MIN_WITHDRAWAL_AMOUNT,
      }}
      Icon={FaMoneyBillWave}
    >
      <div className="space-x-3 flex items-center">
        <span>
          {getCurrency(balance, {
            currency,
          })}
        </span>
      </div>
    </NavItem>
  );
}
