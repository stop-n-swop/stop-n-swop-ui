import React, { useEffect, useState } from 'react';
import Modal from 'ui/elements/Modal';
import {
  useClearNotices,
  useMarkAsRead,
  useNotices,
} from 'application/notices';
import Bell from 'ui/modules/notices/Bell';
import NoticeList from 'ui/modules/notices/NoticeList';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Button from 'ui/elements/Button';
import type { Notice } from '@sns/contracts/notice';

const useReadNotices = (open: boolean, notices: Notice[]) => {
  const { action: markAsRead } = useMarkAsRead();
  const hasUnread = notices.some((notice) => notice.viewed === false);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (open && hasUnread) {
        markAsRead();
      }
    }, 2000);
    return () => clearTimeout(handle);
  }, [markAsRead, open, hasUnread]);
};

export default function Notices({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { data: notices } = useNotices();
  const hasNotifications = notices.length > 0;
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);
  const g = useGetMessage();
  const { action: clearNotices } = useClearNotices();

  useReadNotices(open, notices);

  return (
    <If condition={hasNotifications}>
      <li className={className}>
        <Bell open={open} onOpen={onOpen} notices={notices} />
        <Modal
          title={
            <span className="flex-grow flex items-end justify-between pr-4">
              <span>{g(ids.notices.title)}</span>
              <span>
                <Button
                  className="text-xs"
                  padding={false}
                  onClick={() => {
                    clearNotices();
                    onClose();
                  }}
                >
                  {g(ids.notices.clear)}
                </Button>
              </span>
            </span>
          }
          isOpen={open}
          onClose={onClose}
        >
          <NoticeList notices={notices} onClose={onClose} />
        </Modal>
      </li>
    </If>
  );
}
