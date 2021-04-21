import React from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from 'ui/elements/PageTitle';
import Address from 'ui/modules/account/about-me/Address';
import Container from 'ui/modules/account/dashboard/Container';
import Sections from 'ui/modules/account/dashboard/Sections';

const pages = {
  'about-me': {
    address: Address,
  },
};

const Nuller = () => null;

export default function Dashboard() {
  const name = 'jb';
  const { section, subSection } = useParams<{
    section: string;
    subSection: string;
  }>();
  const Page = pages[section]?.[subSection] ?? Nuller;
  return (
    <>
      <PageTitle>My account</PageTitle>
      <Container name={name}>
        <Sections section={section} subSection={subSection}>
          <Page />
        </Sections>
      </Container>
    </>
  );
}
