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
    <Card className="w-full flex-grow lg:my-4 xl:w-4/5 mx-auto flex flex-col">
      <h2 className="text-xl font-bold my-4">
        {useMessage(ids.account.dashboard.welcome, { name })}
      </h2>
      {children}
    </Card>
  );
}
