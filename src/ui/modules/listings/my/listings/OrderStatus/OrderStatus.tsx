import React, { ReactNode } from 'react';
import { Order, Status } from '@sns/contracts/order';
import { FormattedMessage } from 'react-intl';
import { ids } from 'ui/messages';

export default function OrderStatus({
  order,
  actions,
}: {
  order: Order;
  actions: ReactNode;
}) {
  const status = order?.status ?? Status.NONE;

  return (
    <>
      <span className="px-4 py-3 font-medium w-full lg:w-1/2 text-center lg:text-left">
        <FormattedMessage
          id={ids.order.status[status] ?? ids.order.status.none}
        />
      </span>
      <div className="w-full lg:w-1/2 flex flex-col">{actions}</div>
    </>
  );
}
