import React from 'react';
import Closed from 'ui/help/listings/status/closed.mdx';
import Placed from 'ui/help/listings/status/placed.mdx';
import Approved from 'ui/help/listings/status/approved.mdx';
import Posted from 'ui/help/listings/status/posted.mdx';
import Disputed from 'ui/help/listings/status/disputed.mdx';
import NotReceived from 'ui/help/listings/status/notReceived.mdx';
import { Status } from '@sns/contracts/order';

export default function Help({ status }: { status: Status }) {
  switch (status) {
    case Status.CLOSED:
      return <Closed />;
    case Status.PLACED:
      return <Placed />;
    case Status.APPROVED:
      return <Approved />;
    case Status.POSTED:
      return <Posted />;
    case Status.DISPUTED:
      return <Disputed />;
    case Status.NOT_RECEIVED:
      return <NotReceived />;
    default:
      return null;
  }
}
