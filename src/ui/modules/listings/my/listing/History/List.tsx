import { Status } from '@sns/contracts/order';
import React from 'react';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { AuditItem } from '@sns/contracts/listing';
import HistoryRow from './Row';
import type { Query } from '@respite/core';

export default function HistoryList({
  historyQuery,
  createdDate,
  username,
}: {
  historyQuery: Query<AuditItem[]>;
  createdDate: Date;
  username: string;
}) {
  const getMessage = useGetMessage();
  const { data: history } = historyQuery;

  return (
    <table className="w-full">
      <thead className="sr-only">
        <tr>
          <th>{getMessage(ids.listings.myListing.history.headers.date)}</th>
          <th>{getMessage(ids.listings.myListing.history.headers.username)}</th>
          <th>{getMessage(ids.listings.myListing.history.headers.status)}</th>
        </tr>
      </thead>
      <tbody>
        {history
          .slice()
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .map((item) => (
            <HistoryRow key={new Date(item.date).getTime()} {...item} />
          ))}
        <HistoryRow
          date={createdDate}
          status={Status.OPEN}
          username={username}
        />
      </tbody>
    </table>
  );
}
