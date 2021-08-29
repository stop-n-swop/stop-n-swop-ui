import React, { ReactNode } from 'react';
import { useMessage } from 'ui/intl';
import Card from 'ui/elements/Card';
import { ids } from 'ui/messages';

export default function Container({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <Card
      title={useMessage(ids.account.dashboard.welcome, { name })}
      className="w-full flex-grow lg:my-4 mx-auto container xl:max-w-screen-xl flex flex-col"
      innerClassName="flex-grow flex flex-col"
    >
      {children}
    </Card>
  );
}
