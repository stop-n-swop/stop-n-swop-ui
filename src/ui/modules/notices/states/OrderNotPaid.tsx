import React from 'react';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Notice as INotice } from '@sns/contracts/notice';
import NoticeItem from '../NoticeItem';
import { Err } from '../icons';

// TODO: actions?

export default function OrderNotPaid({ notice }: { notice: INotice }) {
  const g = useGetMessage();

  return (
    <NoticeItem Icon={Err} viewed={notice.viewed}>
      <div>{g(ids.notices.states.orderNotPaid.title)}</div>
      <div className="text-sm font-light italic mt-1 hidden md:block">
        {g(ids.notices.states.orderNotPaid.subtitle)}
      </div>
    </NoticeItem>
  );
}
