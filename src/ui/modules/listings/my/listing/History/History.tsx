import React, { useState, Suspense } from 'react';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Loader from 'ui/modules/Loader';
import type { AuditItem } from '@sns/contracts/listing';
import HistoryList from './List';
import type { Query } from '@respite/core';

export default function History({
  historyQuery,
  createdDate,
  username,
}: {
  historyQuery: Query<AuditItem[]>;
  createdDate: Date;
  username: string;
}) {
  const getMessage = useGetMessage();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="w-full text-left mb-4 font-semibold border-secondary border-b"
        onClick={() => setOpen(!open)}
      >
        {getMessage(ids.listings.myListing.history.label)}
      </button>
      <If condition={open}>
        <Suspense
          fallback={
            <div className="flex justify-center">
              <Loader size="0.5rem" sensible />
            </div>
          }
        >
          <HistoryList
            createdDate={createdDate}
            username={username}
            historyQuery={historyQuery}
          />
        </Suspense>
      </If>
    </div>
  );
}
