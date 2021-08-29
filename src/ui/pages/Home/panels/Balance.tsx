import { useMyListings } from 'application/listings';
import { useBalance } from 'application/payments';
import React from 'react';
import { makeBalancePath } from 'ui/constants/paths';
import { LinkButton } from 'ui/elements/Button';
import { useGetCurrency, useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Panel from 'ui/modules/home/existing/Panel';

export default function BalancePanel() {
  const {
    data: { balance, currency },
  } = useBalance();
  const { data: listings } = useMyListings();
  const getCurrency = useGetCurrency();
  const g = useGetMessage();

  if (listings.length === 0) {
    return null;
  }

  return (
    <Panel
      title={g(ids.home.existing.balance.title)}
      ctas={
        <LinkButton kind="primary" padding to={makeBalancePath()}>
          {g(ids.home.existing.balance.cta)}
        </LinkButton>
      }
    >
      <div className="text-2xl font-bold h-full w-full flex justify-center items-center">
        {getCurrency(balance, { currency })}
      </div>
    </Panel>
  );
}
