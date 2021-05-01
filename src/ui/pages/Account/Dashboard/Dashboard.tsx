import React from 'react';
import { Route, useParams } from 'react-router-dom';
import PageTitle from 'ui/elements/PageTitle';
import Container from 'ui/modules/account/dashboard/Container';
import Sections from 'ui/modules/account/dashboard/Sections';
import { sections } from 'ui/modules/account/dashboard/constants';
import { makeDashboardPath } from 'ui/constants/paths';
import Username from 'ui/modules/account/about-me/Username';
import Email from 'ui/modules/account/about-me/Email';
import Address from 'ui/modules/account/about-me/Address';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { useAuthGuard } from 'usecases/auth';

export default function Dashboard() {
  useAuthGuard();
  const name = 'jb';
  const { section, subSection } = useParams<{
    section: string;
    subSection: string;
  }>();
  const getMessage = useGetMessage();

  return (
    <>
      <PageTitle>{getMessage(ids.account.dashboard.title)}</PageTitle>
      <Container name={name}>
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
            />
          </Route>
          <Route
            path={makeDashboardPath({
              section: 'about-me',
              subSection: 'email',
            })}
          >
            <Email />
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
            />
          </Route>
        </Sections>
      </Container>
    </>
  );
}
