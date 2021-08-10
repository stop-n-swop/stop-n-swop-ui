import { makeDashboardPath } from 'ui/constants/paths';
import { ids } from 'ui/messages';
import type { Section } from './types';

export const sections: Section[] = [
  {
    key: 'about-me',
    label: ids.account.dashboard.sections.aboutMe.label,
    to: makeDashboardPath({ section: 'about-me' }),
    sections: [
      {
        key: 'username',
        to: makeDashboardPath({ section: 'about-me', subSection: 'username' }),
        label: ids.account.dashboard.sections.aboutMe.username,
      },
      {
        key: 'address',
        to: makeDashboardPath({ section: 'about-me', subSection: 'address' }),
        label: ids.account.dashboard.sections.aboutMe.address,
      },
    ],
  },
  {
    key: 'billing',
    label: ids.account.dashboard.sections.billing.label,
    to: makeDashboardPath({ section: 'billing' }),
    sections: [
      {
        key: 'account',
        to: makeDashboardPath({ section: 'billing', subSection: 'account' }),
        label: ids.account.dashboard.sections.billing.account,
      },
    ],
  },
];
