import React, { useEffect, useState } from 'react';
import Button from 'ui/elements/Button';
import { FaRegBell } from 'react-icons/fa';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { useBoop } from 'ui/hooks';
import { animated } from 'react-spring';
import type { Notice } from '@sns/contracts/notice';

const getUnreadNotices = (notices: Notice[]) => {
  return notices.filter((notice) => notice.viewed === false).length;
};

export default function Bell({
  open,
  onOpen,
  notices,
}: {
  open: boolean;
  onOpen(): void;
  notices: Notice[];
}) {
  const [style, boop] = useBoop({ rotation: -20, scale: 0.95 });
  const g = useGetMessage();
  const [unread, setUnread] = useState(() => getUnreadNotices(notices));
  const hasUnread = unread > 0;

  useEffect(() => {
    setUnread(getUnreadNotices(notices));
  }, [notices]);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (open && hasUnread) {
        setUnread(0);
      }
    }, 2000);
    return () => clearTimeout(handle);
  }, [open, hasUnread]);

  return (
    <Button
      className="relative space-x-3"
      title="notifications"
      onClick={onOpen}
      onMouseEnter={boop}
    >
      <animated.span style={style}>
        <FaRegBell size="1em" />
      </animated.span>
      <If condition={hasUnread}>
        <div
          className="md:absolute bg-primary-light rounded-full w-5 h-5 top-0 right-0 flex justify-center items-center text-xs"
          style={{ color: 'white' }}
        >
          {unread}
        </div>
      </If>
      <span className="md:hidden">{g(ids.notices.title)}</span>
    </Button>
  );
}
