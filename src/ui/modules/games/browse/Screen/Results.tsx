import React, { ReactNode, Suspense } from 'react';
import { ProductList } from 'ui/modules/product/products';
import BrowseFilters from 'ui/modules/games/browse/Filters';
import { Query, Status } from '@respite/core';
import LoadingPage from 'ui/pages/Loading';
import { Filters } from 'ui/modules/product/filters';
import type { Platform } from '@sns/contracts/product';
import type { useCounts, useGames } from 'application/games';
import More from '../More';
import Empty from '../Empty';
import type { useListingsCounts } from 'application/listings';
import NoResults from '../NoResults';

export default function Results({
  platformsQuery,
  gamesQuery,
  listingsCountsQuery,
  gamesCountsQuery,
  hasSearched,
  platformIds,
  setPlatformIds,
  children,
  setPage,
  available,
  setAvailable,
}: {
  hasSearched: boolean;
  platformsQuery: Query<Platform[]>;
  gamesQuery: ReturnType<typeof useGames>;
  gamesCountsQuery: ReturnType<typeof useCounts>;
  listingsCountsQuery: ReturnType<typeof useListingsCounts>;
  platformIds: string[];
  setPlatformIds(value: string[]): void;
  setPage(page: number): void;
  children: ReactNode;
  available: boolean;
  setAvailable(value: boolean): void;
}) {
  const { status } = gamesQuery;
  const { data: platforms } = platformsQuery;
  const loading = (() => {
    if (status === Status.FETCHING || status === Status.LOADING) {
      return true;
    }
    if (
      listingsCountsQuery.status === Status.FETCHING ||
      listingsCountsQuery.status === Status.LOADING
    ) {
      return true;
    }
    return false;
  })();
  const nextPage = status === Status.SUCCESS ? gamesQuery.data.nextPage : -1;

  return (
    <div className="flex-grow flex flex-col lg:flex-row">
      <Filters>
        <Suspense fallback={<LoadingPage />}>
          <BrowseFilters
            platforms={platforms}
            platformIds={platformIds}
            setPlatformIds={setPlatformIds}
            hasSearched={hasSearched}
            available={available}
            setAvailable={setAvailable}
            gamesCountsQuery={gamesCountsQuery}
          />
        </Suspense>
      </Filters>
      <Choose>
        <When condition={!hasSearched}>
          <Empty />
        </When>
        <When
          condition={
            hasSearched &&
            status === Status.SUCCESS &&
            gamesQuery.data.games.length === 0
          }
        >
          <NoResults />
        </When>
        <Otherwise>
          <div className="flex-grow">
            <Suspense fallback={<LoadingPage />}>
              <ProductList>{children}</ProductList>
              <If condition={nextPage != null && nextPage >= 0}>
                <More nextPage={nextPage} setPage={setPage} loading={loading} />
              </If>
            </Suspense>
          </div>
        </Otherwise>
      </Choose>
    </div>
  );
}
