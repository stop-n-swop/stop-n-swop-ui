import React, { ReactNode } from 'react';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Block from 'ui/modules/home/common/Block';
import BlockHeading from 'ui/modules/home/common/BlockHeading';

export default function Dash({
  children,
  username,
}: {
  username: string;
  children: ReactNode;
}) {
  return (
    <Block className="bg-opacity-80">
      <BlockHeading className="border-b-2 border-primary pb-4">
        {useMessage(ids.home.existing.dash.title, { username })}
      </BlockHeading>
      <div className="flex flex-col flex-wrap space-y-4 sm:space-y-0 sm:flex-row md:justify-around pt-8">
        {children}
      </div>
    </Block>
  );
}
