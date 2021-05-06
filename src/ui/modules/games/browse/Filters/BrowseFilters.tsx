import type { Platform } from '@sns/contracts/product';
import React from 'react';
import { useGetMessage } from 'ui/intl';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from 'ui/elements/check';
import { ids } from 'ui/messages';
import { Filter, Filters } from 'ui/modules/product/filters';

interface Props {
  platforms: Platform[];
  platformIds: string[];
  platformCounts: Record<string, number>;
  setPlatformIds(value: string[]): void;
  hasSearched: boolean;
}

export default function BrowseFilters({
  hasSearched,
  platforms,
  platformIds,
  platformCounts,
  setPlatformIds,
}: Props) {
  const getMessage = useGetMessage();

  return (
    <Filters>
      <Filter
        name="preferences"
        label={getMessage(ids.games.filters.preferences.label)}
      >
        <Checkbox
          label={getMessage(ids.games.filters.preferences.favourites)}
          value={false}
          onChange={() => null}
          className="mb-3"
        />
        <Checkbox
          label={getMessage(ids.games.filters.preferences.available)}
          value
          onChange={() => null}
        />
      </Filter>
      <Filter
        name="platform"
        label={getMessage(ids.games.filters.platform.label)}
      >
        <CheckboxGroup value={platformIds} onChange={setPlatformIds} limit={10}>
          {platforms
            .filter(({ id }) => {
              const count = platformCounts[id] ?? 0;

              return !hasSearched || count > 0;
            })
            .map(({ name, id }) => {
              const count = platformCounts[id] ?? 0;

              const label = hasSearched ? `${name} (${count})` : name;

              return <CheckboxGroupItem key={id} label={label} value={id} />;
            })}
        </CheckboxGroup>
      </Filter>
    </Filters>
  );
}
