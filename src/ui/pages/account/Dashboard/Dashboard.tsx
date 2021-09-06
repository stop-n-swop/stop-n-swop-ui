import React from 'react';
import { Route, useParams } from 'react-router-dom';
import PageTitle from 'ui/elements/PageTitle';
import Container from 'ui/modules/account/dashboard/Container';
import Sections from 'ui/modules/account/dashboard/Sections';
import { sections } from 'ui/modules/account/dashboard/constants';
import { makeDashboardPath } from 'ui/constants/paths';
import Username from 'ui/modules/account/about-me/Username';
import Address from 'ui/modules/account/about-me/Address';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { useAuthGuard } from 'application/auth';
import { useUser } from 'application/user';
import Account from 'ui/modules/account/billing/Account';
import Preferences from 'ui/modules/account/about-me/Preferences';

export default function Dashboard() {
  useAuthGuard();
  const { data: user } = useUser();
  const { section, subSection } =
    useParams<{
      section: string;
      subSection: string;
    }>();
  const getMessage = useGetMessage();

  return (
    <>
      <PageTitle>{getMessage(ids.account.dashboard.title)}</PageTitle>
      <Container name={user.username ?? user.email}>
        <Sections section={section} subSection={subSection} sections={sections}>
          <Route
            path={makeDashboardPath({
              section: 'about-me',
              subSection: 'username',
            })}
          >
            <Username
              title={getMessage(ids.account.aboutMe.username.title)}
              description={getMessage(ids.account.aboutMe.username.description)}
              submitText={getMessage(ids.account.saveButton)}
              user={user}
            />
          </Route>
          <Route
            path={makeDashboardPath({
              section: 'about-me',
              subSection: 'address',
            })}
          >
            <Address
              title={getMessage(ids.account.aboutMe.address.title)}
              description={getMessage(ids.account.aboutMe.address.description)}
              submitText={getMessage(ids.account.saveButton)}
              user={user}
            />
          </Route>
          <Route
            path={makeDashboardPath({
              section: 'about-me',
              subSection: 'preferences',
            })}
          >
            <Preferences
              title={getMessage(ids.account.aboutMe.preferences.title)}
              description={getMessage(
                ids.account.aboutMe.preferences.description,
              )}
              submitText={getMessage(ids.account.saveButton)}
              user={user}
            />
          </Route>
          <Route
            path={makeDashboardPath({
              section: 'billing',
              subSection: 'account',
            })}
          >
            <Account
              title={getMessage(ids.account.billing.title)}
              description={getMessage(ids.account.billing.description)}
              submitText={getMessage(ids.account.saveButton)}
              user={user}
            />
          </Route>
        </Sections>
      </Container>
    </>
  );
}
