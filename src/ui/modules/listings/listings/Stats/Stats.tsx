import React from 'react';
import { Checkbox } from 'ui/elements/check';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Stats } from '@sns/contracts/listing';

const noop = () => null;

export default function Statistics({ stats }: { stats: Stats }) {
  const getMessage = useGetMessage();

  return (
    <div className="flex flex-wrap text-xs italic text-gray-300">
      <Checkbox
        label={getMessage(
          ids.conditions[stats.condition] ?? ids.conditions.unknown,
        )}
        value
        onChange={noop}
        className="w-1/2 mb-2 lg:w-1/3 xl:w-1/5"
        readonly
      />
      <Checkbox
        label={getMessage(ids.listings.filters.features.boxed)}
        value={stats.boxed}
        onChange={noop}
        className="w-1/2 mb-2 lg:w-1/3 xl:w-1/5"
        readonly
      />
      <Checkbox
        label={getMessage(ids.listings.filters.features.instructions)}
        value={stats.instructions}
        onChange={noop}
        className="w-1/2 mb-2 lg:w-1/3 xl:w-1/5"
        readonly
      />
      <Checkbox
        label={getMessage(ids.regions[stats.region] ?? ids.regions.unknown)}
        value
        onChange={noop}
        className="w-1/2 mb-2 lg:w-1/3 xl:w-1/5"
        readonly
      />
    </div>
  );
}
