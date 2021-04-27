import type { Status } from '@sns/contracts/order';
import React from 'react';
import { useDate, useMessage } from 'ui/intl';
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
      <td className="py-3">{useDate(date)}</td>
      <td>{username}</td>
      <td className="text-right">
        {useMessage(ids.order.status[status] ?? ids.order.status.none)}
      </td>
    </tr>
  );
}
