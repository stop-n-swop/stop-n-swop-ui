import React from 'react';
import { useIntl } from 'ui/intl';
import { ids } from 'ui/messages';
import type { User } from '@sns/contracts/user';

export default function UserOverview({
  user,
  completedListingsCount,
}: {
  user: User;
  completedListingsCount: number;
}) {
  const { date: getDate, message: g } = useIntl();

  return (
    <div className="flex flex-wrap">
      <div className="w-1/2 pb-8">
        <h3 className="font-semibold">{g(ids.account.user.created)}</h3>
        <div className="text-sm">{getDate(user.created)}</div>
      </div>
      <If condition={completedListingsCount}>
        <div className="w-1/2 pb-8">
          <h3 className="font-semibold">
            {g(ids.account.user.completedCount)}
          </h3>
          <div className="text-sm">{completedListingsCount}</div>
        </div>
      </If>
      <If condition={user.address.location}>
        <div className="md:w-1/2 pb-8">
          <h3 className="font-semibold">{g(ids.account.user.location)}</h3>
          <div className="text-sm">{user.address.location}</div>
        </div>
      </If>
    </div>
  );
}
