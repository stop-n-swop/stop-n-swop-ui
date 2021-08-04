import React from 'react';
import { LinkButton } from 'ui/elements/Button';
import { makeMyOrderPath } from 'ui/constants/paths';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Notice as INotice } from '@sns/contracts/notice';
import NoticeItem from '../NoticeItem';
import { Success } from '../icons';

export default function OrderExpiring({
  notice,
  onClose,
}: {
  notice: INotice;
  onClose(): void;
}) {
  const getMessage = useGetMessage();

  return (
    <NoticeItem
      viewed={notice.viewed}
      Icon={Success}
      actions={
        <LinkButton
          kind="primary"
          padding
          to={makeMyOrderPath({ orderId: notice.data.orderId })}
          onClick={onClose}
        >
          {getMessage(ids.notices.states.orderExpiring.action)}
        </LinkButton>
      }
    >
      <div className="flex space-x-4 items-center">
        <span>{getMessage(ids.notices.states.orderExpiring.title)}</span>
      </div>
      <div className="text-sm font-light italic mt-1 hidden md:block">
        {getMessage(ids.notices.states.orderExpiring.subtitle)}
      </div>
    </NoticeItem>
  );
}
