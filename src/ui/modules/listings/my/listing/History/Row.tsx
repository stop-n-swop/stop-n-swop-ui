import { Status } from '@sns/contracts/order';
import React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { ids } from 'ui/messages';

export default function HistoryRow({
  date,
  username,
  status,
}: {
  date: Date;
  username: string;
  status: Status;
}) {
  return (
    <tr className="border-b border-gray-600">
      <td className="py-3">
        <FormattedDate value={date} />
      </td>
      <td>{username}</td>
      <td className="text-right">
        <FormattedMessage
          id={ids.order.status[status] ?? ids.order.status.none}
        />
      </td>
    </tr>
  );
}
