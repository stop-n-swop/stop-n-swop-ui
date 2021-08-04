import React from 'react';
import { Status } from '@sns/contracts/order';
import Pending from 'ui/help/orders/status/pending.mdx';
import Placed from 'ui/help/orders/status/placed.mdx';
import Approved from 'ui/help/orders/status/approved.mdx';
import Posted from 'ui/help/orders/status/posted.mdx';
import Declined from 'ui/help/orders/status/declined.mdx';
import Disputed from 'ui/help/orders/status/disputed.mdx';
import Received from 'ui/help/orders/status/received.mdx';

export default function Help({ status }: { status: Status }) {
  switch (status) {
    case Status.CREATED:
    case Status.PENDING:
      return <Pending />;
    case Status.PLACED:
      return <Placed />;
    case Status.APPROVED:
      return <Approved />;
    case Status.DECLINED:
      return <Declined />;
    case Status.POSTED:
      return <Posted />;
    case Status.DISPUTED:
    case Status.NOT_RECEIVED:
      return <Disputed />;
    case Status.RECEIVED:
      return <Received />;
    default:
      return null;
  }
}
