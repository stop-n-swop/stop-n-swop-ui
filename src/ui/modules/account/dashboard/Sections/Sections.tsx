import React, { ReactNode, useEffect } from 'react';
import { makeDashboardPath, MY_LISTINGS, MY_ORDERS } from 'ui/constants/paths';
import { useHistory } from 'react-router-dom';
import SectionList from '../SectionList';
import SectionContent from '../SectionContent';
import SubSections from '../SubSections';

export default function Sections({
  section,
  subSection,
  children,
}: {
  section: string;
  subSection: string;
  children: ReactNode;
}) {
  const { replace } = useHistory();
  useEffect(() => {
    if (!section) {
      replace(makeDashboardPath({ section: 'about-me' }));
    }
  }, [replace, section]);

  return (
    <div className="flex flex-col lg:flex-row flex-grow mt-4">
      <SectionList
        current={section}
        options={[
          {
            key: 'about-me',
            label: 'About me',
            to: makeDashboardPath({ section: 'about-me' }),
          },
          {
            key: 'security',
            label: 'Security',
            to: makeDashboardPath({ section: 'security' }),
          },
          {
            key: 'orders',
            label: 'Orders',
            to: MY_ORDERS,
          },
          {
            key: 'listings',
            label: 'Listings',
            to: MY_LISTINGS,
          },
        ]}
      />
      <SectionContent>
        <SubSections section={section} subSection={subSection}>
          {children}
        </SubSections>
      </SectionContent>
    </div>
  );
}
