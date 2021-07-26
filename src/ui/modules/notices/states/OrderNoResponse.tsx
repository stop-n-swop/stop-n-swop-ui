import React from 'react';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Notice } from '@sns/contracts/notice';
import NoticeItem from '../NoticeItem';

export default function OrderNoResponse({ notice }: { notice: Notice }) {
  const getMessage = useGetMessage();

  return (
    <NoticeItem viewed={notice.viewed}>
      <div>{getMessage(ids.notices.states.orderNoResponse.title)}</div>
      <div className="text-sm font-light italic mt-1">
        {getMessage(ids.notices.states.orderNoResponse.subtitle)}
      </div>
    </NoticeItem>
  );
}
