import { Status } from 'core/constants/order';
import { Audit } from 'core/entity/listings';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ids } from 'ui/messages';
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
  return (
    <div>
      <h3 className="mb-4">
        <FormattedMessage id={ids.listings.myListing.history.label} />
      </h3>
      <table className="w-full">
        <thead className="sr-only">
          <tr>
            <th>
              <FormattedMessage
                id={ids.listings.myListing.history.headers.date}
              />
            </th>
            <th>
              <FormattedMessage
                id={ids.listings.myListing.history.headers.username}
              />
            </th>
            <th>
              <FormattedMessage
                id={ids.listings.myListing.history.headers.status}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <HistoryRow
            date={createdDate}
            status={Status.NONE}
            username={username}
          />
          {history.map((item) => (
            <HistoryRow key={item.date.getTime()} {...item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
