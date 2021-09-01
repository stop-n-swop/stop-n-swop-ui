import React from 'react';
import { useGetMessage } from 'ui/intl';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from 'ui/elements/check';
import { ids } from 'ui/messages';
import { Filter } from 'ui/modules/product/filters';
import { sortBy } from 'crosscutting/utils';
import type { Platform } from '@sns/contracts/product';
import type { useCounts } from 'application/games';

interface Props {
  available: boolean;
  setAvailable(value: boolean): void;
  platforms: Platform[];
  platformIds: string[];
  setPlatformIds(value: string[]): void;
  hasSearched: boolean;
  gamesCountsQuery: ReturnType<typeof useCounts>;
  favourites: boolean;
  setFavourites(value: boolean): void;
  isLoggedIn: boolean;
  developerIds: string[];
  setDeveloperIds(value: string[]): void;
  publisherIds: string[];
  setPublisherIds(value: string[]): void;
}

export default function BrowseFilters({
  hasSearched,
  available,
  setAvailable,
  platforms,
  platformIds,
  setPlatformIds,
  developerIds,
  setDeveloperIds,
  publisherIds,
  setPublisherIds,
  gamesCountsQuery,
  favourites,
  isLoggedIn,
  setFavourites,
}: Props) {
  const getMessage = useGetMessage();
  const {
    data: { platforms: platformCounts, developers, publishers },
  } = gamesCountsQuery;

  return (
    <>
      <Filter
        name="preferences"
        label={getMessage(ids.games.filters.preferences.label)}
      >
        <div className="space-y-3">
          <Checkbox
            label={getMessage(ids.games.filters.preferences.available)}
            value={available}
            onChange={setAvailable}
          />
          <If condition={isLoggedIn}>
            <Checkbox
              label={getMessage(ids.games.filters.preferences.favourites)}
              value={favourites}
              onChange={setFavourites}
            />
          </If>
        </div>
      </Filter>
      <Filter
        name="platform"
        label={getMessage(ids.games.filters.platform.label)}
      >
        <CheckboxGroup value={platformIds} onChange={setPlatformIds} limit={5}>
          {sortBy(platforms, (platform) => {
            if (platformIds.includes(platform.id)) {
              return `000000${platform.name}`;
            }
            return platform.name;
          })
            .filter(({ id }) => {
              const count = platformCounts[id] ?? 0;

              return !hasSearched || platformIds.includes(id) || count > 0;
            })
            .map(({ name, id }) => {
              const count = platformCounts[id] ?? 0;

              const label = hasSearched ? `${name} (${count})` : name;

              return <CheckboxGroupItem key={id} label={label} value={id} />;
            })}
        </CheckboxGroup>
      </Filter>
      <If condition={developers && Object.keys(developers).length}>
        <Filter
          name="developers"
          label={getMessage(ids.games.filters.developer.label)}
        >
          <CheckboxGroup
            value={developerIds}
            onChange={setDeveloperIds}
            limit={4}
          >
            {sortBy(Object.values(developers), (developer) => {
              if (developerIds.includes(developer.id)) {
                return `00000000${developer.name}`;
              }
              return developer.name;
            }).map(({ id, count, name }) => {
              const label = `${name} (${count})`;

              return <CheckboxGroupItem key={id} label={label} value={id} />;
            })}
          </CheckboxGroup>
        </Filter>
      </If>
      <If condition={publishers && Object.keys(publishers).length}>
        <Filter
          name="publishers"
          label={getMessage(ids.games.filters.publisher.label)}
        >
          <CheckboxGroup
            value={publisherIds}
            onChange={setPublisherIds}
            limit={4}
          >
            {sortBy(Object.values(publishers), (publisher) => {
              if (publisherIds.includes(publisher.id)) {
                return `000000${publisher.name}`;
              }
              return publisher.name;
            }).map(({ id, count, name }) => {
              const label = `${name} (${count})`;

              return <CheckboxGroupItem key={id} label={label} value={id} />;
            })}
          </CheckboxGroup>
        </Filter>
      </If>
    </>
  );
}
