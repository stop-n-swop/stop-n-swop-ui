import { Status } from '@sns/contracts/order';
import React from 'react';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Audit } from '@sns/contracts/listing';
import HistoryRow from './Row';

export default function History({
  history,
  createdDate,
  username,
}: {
  history: Audit;
  createdDate: Date;
  username: string;
}) {
  const getMessage = useGetMessage();

  return (
    <div>
      <h3 className="mb-4">
        {getMessage(ids.listings.myListing.history.label)}
      </h3>
      <table className="w-full">
        <thead className="sr-only">
          <tr>
            <th>{getMessage(ids.listings.myListing.history.headers.date)}</th>
            <th>
              {getMessage(ids.listings.myListing.history.headers.username)}
            </th>
            <th>{getMessage(ids.listings.myListing.history.headers.status)}</th>
          </tr>
        </thead>
        <tbody>
          <HistoryRow
            date={createdDate}
            status={Status.OPEN}
            username={username}
          />
          {history.map((item) => (
            <HistoryRow key={new Date(item.date).getTime()} {...item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
