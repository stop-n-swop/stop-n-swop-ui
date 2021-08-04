import React from 'react';
import { LinkButton } from 'ui/elements/Button';
import { makeMyOrderPath } from 'ui/constants/paths';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Notice as INotice } from '@sns/contracts/notice';
import NoticeItem from '../NoticeItem';
import { Err } from '../icons';

export default function OrderDeclined({
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
      Icon={Err}
      actions={
        <LinkButton
          kind="primary"
          to={makeMyOrderPath({ orderId: notice.data.orderId })}
          onClick={onClose}
          padding
        >
          {getMessage(ids.notices.states.orderDeclined.action)}
        </LinkButton>
      }
    >
      <span>{getMessage(ids.notices.states.orderDeclined.title)}</span>
    </NoticeItem>
  );
}
