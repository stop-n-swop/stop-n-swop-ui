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

interface Props {
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
  favourites: boolean;
  setFavourites(value: boolean): void;
  isLoggedIn: boolean;
  developerIds: string[];
  setDeveloperIds(value: string[]): void;
  publisherIds: string[];
  setPublisherIds(value: string[]): void;
}

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
  favourites,
  isLoggedIn,
  setFavourites,
  developerIds,
  setDeveloperIds,
  publisherIds,
  setPublisherIds,
}: Props) {
  const { status } = gamesQuery;
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
            platformsQuery={platformsQuery}
            platformIds={platformIds}
            setPlatformIds={setPlatformIds}
            hasSearched={hasSearched}
            available={available}
            setAvailable={setAvailable}
            gamesCountsQuery={gamesCountsQuery}
            favourites={favourites}
            isLoggedIn={isLoggedIn}
            setFavourites={setFavourites}
            developerIds={developerIds}
            setDeveloperIds={setDeveloperIds}
            publisherIds={publisherIds}
            setPublisherIds={setPublisherIds}
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
          <div className="flex-grow py-8">
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
