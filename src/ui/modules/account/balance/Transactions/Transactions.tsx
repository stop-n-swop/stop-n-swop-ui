import React from 'react';
import { makeMyListingPath } from 'ui/constants/paths';
import { useGetCurrency, useGetDate, useGetMessage } from 'ui/intl';
import { LinkButton } from 'ui/elements/Button';
import { sortBy } from 'crosscutting/utils';
import { ids } from 'ui/messages';
import type { Query } from '@respite/core';
import type { Transaction } from '@sns/contracts/payment';

interface Props {
  transactionsQuery: Query<Transaction[]>;
}

export default function Transactions({
  transactionsQuery: { data: transactions },
}: Props) {
  const g = useGetMessage();
  const getCurrency = useGetCurrency();
  const getDate = useGetDate();

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left">
          <th>{g(ids.account.balance.transactions.date.label)}</th>
          <th className="hidden lg:table-cell">
            {g(ids.account.balance.transactions.listingId.label)}
          </th>
          <th className="hidden xl:table-cell">
            {g(ids.account.balance.transactions.transactionId.label)}
          </th>
          <th className="hidden sm:table-cell">
            {g(ids.account.balance.transactions.type.label)}
          </th>
          <th className="text-right">
            {g(ids.account.balance.transactions.amount.label)}
          </th>
          <th className="text-right">
            {g(ids.account.balance.transactions.fees.label)}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortBy(transactions, (t) => t.date, false).map(
          ({ amount, currency, date, fees, listingId, id, type }) => {
            const signedAmount = type === 'pay-out' ? 0 - amount : amount;

            return (
              <tr
                key={id}
                className="odd:border-t odd:border-b odd:border-white"
              >
                <td className="py-3">{getDate(date)}</td>
                <td className="hidden lg:table-cell">
                  <LinkButton
                    className="inline-flex"
                    to={makeMyListingPath({ listingId })}
                  >
                    {listingId}
                  </LinkButton>
                </td>
                <td className="hidden xl:table-cell">{id}</td>
                <td className="hidden sm:table-cell">
                  {g(ids.account.balance.transactions.type[type]) ||
                    g(ids.account.balance.transactions.type.unknown)}
                </td>
                <td className="text-right">
                  {getCurrency(signedAmount, { currency })}
                </td>
                <td className="text-right">
                  {getCurrency(fees, { currency })}
                </td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
}
