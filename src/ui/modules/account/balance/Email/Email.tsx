import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { makeDashboardPath } from 'ui/constants/paths';
import { LinkButton } from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';

export default function Email({ email }: { email: string }) {
  const g = useGetMessage();

  return (
    <div className="font-retro text-xs">
      <div className="flex flex-col items-center md:items-end md:pt-12">
        <LinkButton
          title={g(ids.account.balance.email.label)}
          className="text-sm space-x-4"
          to={makeDashboardPath({
            section: 'billing',
            subSection: 'account',
          })}
        >
          <span>
            <Choose>
              <When condition={email}>{email}</When>
              <Otherwise>{g(ids.account.balance.email.required)}</Otherwise>
            </Choose>
          </span>
          <FaArrowRight />
        </LinkButton>
      </div>
    </div>
  );
}
