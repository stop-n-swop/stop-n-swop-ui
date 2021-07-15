import React from 'react';
import { Order, Status } from '@sns/contracts/order';
import { useGetDate } from 'ui/intl';
import { ListItem } from 'ui/elements/list';
import type { Status as RStatus } from '@respite/core';
import ActionButton from './ActionButton';

interface Props {
  order: Order;
  status: RStatus;
  active: { orderId: string; status: Status };
  onChangeStatus(args: { orderId: string; status: Status }): void;
}

export default function MultiOrder({
  order: { id, created, username, status: orderStatus },
  status,
  onChangeStatus,
  active,
}: Props) {
  const getDate = useGetDate();

  return (
    <ListItem className="flex flex-wrap items-center sm:px-8 md:py-4">
      <div className="w-2/3 md:w-1/3">{username}</div>
      <div className="hidden md:block w-1/3 text-center">
        {getDate(created, {
          dateStyle: 'short',
          timeStyle: 'medium',
        })}
      </div>
      <div className="flex flex-col-reverse sm:flex-row w-1/3 justify-end">
        <ActionButton
          action={Status.DECLINED}
          active={active.orderId === id && active.status === Status.DECLINED}
          orderId={id}
          status={status}
          onClick={onChangeStatus}
          kind="tertiary"
          showIcon={false}
        />
        <If condition={orderStatus === Status.PAID}>
          <ActionButton
            action={Status.APPROVED}
            active={active.orderId === id && active.status === Status.APPROVED}
            orderId={id}
            status={status}
            onClick={onChangeStatus}
            kind="tertiary"
            showIcon={false}
          />
        </If>
      </div>
    </ListItem>
  );
}
