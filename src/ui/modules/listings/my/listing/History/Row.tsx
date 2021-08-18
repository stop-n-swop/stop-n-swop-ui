import React from 'react';
import { useDate, useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Status } from '@sns/contracts/order';

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
      <td className="py-3">{useDate(date)}</td>
      <td>{useMessage(ids.order.status[status] ?? ids.order.status.open)}</td>
      <td className="hidden sm:table-cell text-right">{username}</td>
    </tr>
  );
}
