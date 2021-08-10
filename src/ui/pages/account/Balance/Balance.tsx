import React, { Suspense } from 'react';
import Screen from 'ui/modules/account/balance/Screen';
import Balance from 'ui/modules/account/balance/Balance';
import Transactions from 'ui/modules/account/balance/Transactions';
import { useUser } from 'application/user';
import { useAuthGuard } from 'application/auth';
import {
  useBalance,
  useTransactions,
  useWithdrawBalance,
} from 'application/payments';
import Loader from 'ui/modules/Loader';
import Email from 'ui/modules/account/balance/Email';

export default function BalancePage() {
  useAuthGuard();
  const {
    data: { balance, currency },
  } = useBalance();
  const { action: withdraw, status, error } = useWithdrawBalance();
  const { data: user } = useUser();
  const transactionsQuery = useTransactions();

  const handleSubmit = async ({ amount }: { amount: number }) => {
    await withdraw({ amount });
  };

  return (
    <Screen
      error={error}
      balance={
        <Balance
          user={user}
          balance={balance}
          currency={currency}
          onSubmit={handleSubmit}
          status={status}
        />
      }
      email={<Email email={user.clientEmail} />}
      transactions={
        <Suspense
          fallback={
            <div className="flex justify-center">
              <Loader sensible />
            </div>
          }
        >
          <Transactions transactionsQuery={transactionsQuery} />
        </Suspense>
      }
    />
  );
}
