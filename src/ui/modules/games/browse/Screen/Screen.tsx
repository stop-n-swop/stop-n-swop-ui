import React, { ReactNode, Suspense } from 'react';
import Search from 'ui/modules/games/browse/Search';
import PageTitle from 'ui/elements/PageTitle';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import LoadingPage from 'ui/pages/Loading';
import type { Query } from '@respite/core';
import type { Platform } from '@sns/contracts/product';
import type { useCounts, useGames } from 'application/games';
import Results from './Results';
import type { useListingsCounts } from 'application/listings';

export default function BrowseScreen({
  platformsQuery,
  gamesQuery,
  listingsCountsQuery,
  gamesCountsQuery,
  hasSearched,
  search,
  platformIds,
  setPlatformIds,
  onSearch,
  children,
  setPage,
  available,
  setAvailable,
}: {
  hasSearched: boolean;
  platformsQuery: Query<Platform[]>;
  gamesQuery: ReturnType<typeof useGames>;
  listingsCountsQuery: ReturnType<typeof useListingsCounts>;
  gamesCountsQuery: ReturnType<typeof useCounts>;
  search: string;
  platformIds: string[];
  onSearch(value: string): void;
  setPlatformIds(value: string[]): void;
  setPage(page: number): void;
  children: ReactNode;
  available: boolean;
  setAvailable(value: boolean): void;
}) {
  return (
    <div className="flex-grow flex flex-col">
      <PageTitle>{useMessage(ids.games.title)}</PageTitle>
      <Search value={search} onChange={onSearch} />
      <Suspense fallback={<LoadingPage />}>
        <Results
          gamesQuery={gamesQuery}
          listingsCountsQuery={listingsCountsQuery}
          hasSearched={hasSearched}
          platformIds={platformIds}
          platformsQuery={platformsQuery}
          gamesCountsQuery={gamesCountsQuery}
          setPage={setPage}
          setPlatformIds={setPlatformIds}
          available={available}
          setAvailable={setAvailable}
        >
          {children}
        </Results>
      </Suspense>
    </div>
  );
}
