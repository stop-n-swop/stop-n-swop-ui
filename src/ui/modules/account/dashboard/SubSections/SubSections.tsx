import React, { ReactNode, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { makeDashboardPath } from 'ui/constants/paths';
import ContentBlock from '../ContentBlock';
import SectionContent from '../SectionContent';
import SectionList from '../SectionList';

const getSubSections = (section: string) => {
  switch (section) {
    case 'about-me':
      return [
        {
          key: 'username',
          to: makeDashboardPath({ section, subSection: 'username' }),
          label: 'Username',
        },
        {
          key: 'email',
          to: makeDashboardPath({ section, subSection: 'email' }),
          label: 'Email',
        },
        {
          key: 'name',
          to: makeDashboardPath({ section, subSection: 'name' }),
          label: 'Name',
        },
        {
          key: 'address',
          to: makeDashboardPath({ section, subSection: 'address' }),
          label: 'Address',
        },
      ];
    case 'security':
      return [
        {
          key: 'password',
          to: makeDashboardPath({ section, subSection: 'password' }),
          label: 'Password',
        },
      ];
    default:
      return [];
  }
};

export default function SubSections({
  section,
  subSection,
  children,
}: {
  section: string;
  subSection: string;
  children: ReactNode;
}) {
  const { replace } = useHistory();
  const subSections = useMemo(() => getSubSections(section), [section]);
  useEffect(() => {
    if (section && !subSection && subSections.length) {
      replace(makeDashboardPath({ section, subSection: subSections[0].key }));
    }
  }, [replace, section, subSection, subSections]);

  return (
    <div className="flex flex-col lg:flex-row flex-grow">
      <SectionList options={subSections} current={subSection} />
      <SectionContent>
        <ContentBlock>{children}</ContentBlock>
      </SectionContent>
    </div>
  );
}
