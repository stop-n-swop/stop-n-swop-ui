import React from 'react';
import { Checkbox } from 'ui/elements/check';
import { FormattedMessage } from 'react-intl';
import { ids } from 'ui/messages';
import { Stats } from 'core/entity/listings';

const noop = () => null;

export default function Statistics({ stats }: { stats: Stats }) {
  return (
    <div className="flex flex-wrap text-xs italic text-gray-300">
      <Checkbox
        label={
          <FormattedMessage
            id={ids.conditions[stats.condition] ?? ids.conditions.unknown}
          />
        }
        value
        onChange={noop}
        className="w-1/2 mb-2 lg:w-1/3 xl:w-1/5"
        readonly
      />
      <Checkbox
        label={<FormattedMessage id={ids.listings.filters.features.boxed} />}
        value={stats.boxed}
        onChange={noop}
        className="w-1/2 mb-2 lg:w-1/3 xl:w-1/5"
        readonly
      />
      <Checkbox
        label={
          <FormattedMessage id={ids.listings.filters.features.instructions} />
        }
        value={stats.instructions}
        onChange={noop}
        className="w-1/2 mb-2 lg:w-1/3 xl:w-1/5"
        readonly
      />
      <Checkbox
        label={
          <FormattedMessage
            id={ids.regions[stats.region] ?? ids.regions.unknown}
          />
        }
        value
        onChange={noop}
        className="w-1/2 mb-2 lg:w-1/3 xl:w-1/5"
        readonly
      />
    </div>
  );
}
