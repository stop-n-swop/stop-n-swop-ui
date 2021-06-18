import { Status } from '@sns/contracts/order';
import React, { useState } from 'react';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { AuditItem } from '@sns/contracts/listing';
import HistoryRow from './Row';

export default function History({
  history,
  createdDate,
  username,
}: {
  history: AuditItem[];
  createdDate: Date;
  username: string;
}) {
  const getMessage = useGetMessage();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="w-full text-left mb-4 font-semibold border-primary border-b"
        onClick={() => setOpen(!open)}
      >
        {getMessage(ids.listings.myListing.history.label)}
      </button>
      <If condition={open}>
        <table className="w-full">
          <thead className="sr-only">
            <tr>
              <th>{getMessage(ids.listings.myListing.history.headers.date)}</th>
              <th>
                {getMessage(ids.listings.myListing.history.headers.username)}
              </th>
              <th>
                {getMessage(ids.listings.myListing.history.headers.status)}
              </th>
            </tr>
          </thead>
          <tbody>
            {history
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime(),
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
      </If>
    </div>
  );
}
