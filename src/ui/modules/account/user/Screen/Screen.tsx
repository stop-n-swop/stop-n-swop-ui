import React, { ReactNode } from 'react';
import Card from 'ui/elements/Card';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';

export default function UserScreen({
  username,
  overview,
  listings,
}: {
  username: string;
  overview: ReactNode;
  listings: ReactNode;
}) {
  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <Card
        title={username}
        className="w-full max-w-screen-lg flex-grow md:flex-grow-0"
      >
        <div className="divide-y-2">
          <div className="pb-8">{overview}</div>
          <div className="space-y-4 pt-8">
            <h3 className="font-semibold">
              {useMessage(ids.account.user.listings)}
            </h3>
            {listings}
          </div>
        </div>
      </Card>
    </div>
  );
}
