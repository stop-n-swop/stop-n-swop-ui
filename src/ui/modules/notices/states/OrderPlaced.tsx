import React from 'react';
import { LinkButton } from 'ui/elements/Button';
import { makeMyListingPath } from 'ui/constants/paths';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import NoticeItem from '../NoticeItem';
import type { Notice as INotice } from '@sns/contracts/notice';

export default function OrderPlaced({
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
          to={makeMyListingPath({ listingId: notice.data.listingId })}
          onClick={onClose}
        >
          {getMessage(ids.notices.states.orderPlaced.action)}
        </LinkButton>
      }
    >
      <div>{getMessage(ids.notices.states.orderPlaced.title)}</div>
      <div className="text-sm font-light italic mt-1 hidden md:block">
        {getMessage(ids.notices.states.orderPlaced.subtitle)}
      </div>
    </NoticeItem>
  );
}
