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
      className="w-full flex-grow lg:my-4 xl:w-4/5 mx-auto flex flex-col"
    >
      {children}
    </Card>
  );
}
