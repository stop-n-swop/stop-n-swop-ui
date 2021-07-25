import React from 'react';
import { Link } from 'react-router-dom';
import { makeDashboardPath } from 'ui/constants/paths';
import { KycStatus, User } from '@sns/contracts/user';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { hasAccount, isVerified } from 'domain/selectors/user';

export default function Obligates({ user }: { user: User }) {
  const g = useGetMessage();

  if (!hasAccount(user) && !isVerified(user)) {
    return (
      <Link
        to={makeDashboardPath({ section: 'billing', subSection: 'account' })}
        className="bg-warning hover:bg-warning-light px-3 py-4 block transition-colors"
      >
        <span>{g(ids.account.balance.obligates.both)}</span>
      </Link>
    );
  }
  if (!hasAccount(user)) {
    return (
      <Link
        to={makeDashboardPath({ section: 'billing', subSection: 'account' })}
        className="bg-warning hover:bg-warning-light px-3 py-4 block transition-colors"
      >
        <span>{g(ids.account.balance.obligates.account)}</span>
      </Link>
    );
  }
  if (user.kycStatus === KycStatus.VERIFYING) {
    return (
      <Link
        to={makeDashboardPath({ section: 'billing', subSection: 'verify' })}
        className="bg-warning hover:bg-warning-light px-3 py-4 block transition-colors"
      >
        <span>{g(ids.account.balance.obligates.verifying)}</span>
      </Link>
    );
  }
  if (!isVerified(user)) {
    return (
      <Link
        to={makeDashboardPath({ section: 'billing', subSection: 'verify' })}
        className="bg-warning hover:bg-warning-light px-3 py-4 block transition-colors"
      >
        <span>{g(ids.account.balance.obligates.notVerified)}</span>
      </Link>
    );
  }
  return null;
}
