import React, { ReactNode } from 'react';
import FormError from 'ui/elements/FormError';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Hero from '../Hero';

export default function Screen({
  balance,
  transactions,
  email,
  error,
}: {
  balance: ReactNode;
  transactions: ReactNode;
  email: ReactNode;
  error: any;
}) {
  return (
    <div className="flex-grow bg-black">
      <If condition={error}>
        <FormError error={error} />
      </If>
      <Hero>
        {balance}
        {email}
      </Hero>
      <div className="mt-12 space-y-4 container px-4 lg:px-8 2xl:px-12 mx-auto">
        <h2 className="font-semibold">
          {useMessage(ids.account.balance.transactions.title)}
        </h2>
        {transactions}
      </div>
    </div>
  );
}
