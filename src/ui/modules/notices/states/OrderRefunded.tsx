import React from 'react';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Notice as INotice } from '@sns/contracts/notice';
import NoticeItem from '../NoticeItem';

export default function OrderRefunded({ notice }: { notice: INotice }) {
  return (
    <NoticeItem viewed={notice.viewed}>
      <span>{useMessage(ids.notices.states.orderRefunded.title)}</span>
    </NoticeItem>
  );
}
