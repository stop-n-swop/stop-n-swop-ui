import React, { ReactNode } from 'react';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Stats } from '@sns/contracts/listing';

const Pill = ({ children }: { children: ReactNode }) => {
  return (
    <span
      className="even:bg-gray-300 odd:bg-gray-200 text-gray-700 rounded-3xl px-3 py-2 text-center text-sm mr-4 mt-4"
      style={{ minWidth: '5rem' }}
    >
      {children}
    </span>
  );
};

export default function Statistics({ stats }: { stats: Stats }) {
  const getMessage = useGetMessage();

  return (
    <div className="flex flex-wrap text-xs italic text-gray-300">
      <If condition={ids.conditions[stats.condition]}>
        <Pill>{getMessage(ids.conditions[stats.condition])}</Pill>
      </If>
      <If condition={stats.boxed}>
        <Pill>{getMessage(ids.listings.filters.features.boxed)}</Pill>
      </If>
      <If condition={stats.instructions}>
        <Pill>{getMessage(ids.listings.filters.features.instructions)}</Pill>
      </If>
      <If condition={ids.regions[stats.region]}>
        <Pill>{getMessage(ids.regions[stats.region])}</Pill>
      </If>
    </div>
  );
}
