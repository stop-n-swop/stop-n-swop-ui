import React from 'react';
import { LinkButton } from 'ui/elements/Button';
import { makeBalancePath } from 'ui/constants/paths';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import NoticeItem from '../NoticeItem';
import type { Notice as INotice } from '@sns/contracts/notice';

export default function OrderComplete({
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
      actions={
        <LinkButton
          kind="primary"
          padding
          to={makeBalancePath()}
          onClick={onClose}
        >
          {getMessage(ids.notices.states.orderComplete.action)}
        </LinkButton>
      }
    >
      <div>{getMessage(ids.notices.states.orderComplete.title)}</div>
      <div className="text-sm font-light italic mt-1">
        {getMessage(ids.notices.states.orderComplete.subtitle)}
      </div>
    </NoticeItem>
  );
}
