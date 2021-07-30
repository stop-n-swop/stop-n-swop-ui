import React, { useEffect, useRef, useState, Suspense } from 'react';
import Screen from 'ui/modules/games/browse/Screen';
import { usePlatforms } from 'application/platforms';
import { useCounts, useGames } from 'application/games';
import { useHistory } from 'react-router-dom';
import { useQueryParam } from 'ui/hooks';
import { useDebounce } from 'use-debounce';
import { useListingsCounts } from 'application/listings';
import LoadingPage from 'ui/pages/Loading';
import Items from './Items';

const useInitialValues = () => {
  const initialSearch = useQueryParam<string>('q', { default: '' });
  const initialPlatforms = useQueryParam<string[]>('platforms', {
    array: true,
  });
  const initialAvailable = useQueryParam('available', {
    default: false,
    bool: true,
  });

  return { initialSearch, initialPlatforms, initialAvailable };
};

const useResetParams = ({
  initialSearch,
  initialPlatforms,
  initialAvailable,
  search,
  platformIds,
  available,
  latentSearch,
  flush,
  setPage,
  setSearch,
  setPlatformIds,
  setAvailable,
}: {
  initialSearch: string;
  initialPlatforms: string[];
  initialAvailable: boolean;
  search: string;
  platformIds: string[];
  available: boolean;
  latentSearch: string;
  flush(): void;
  setPage(p: number): void;
  setSearch(s: string): void;
  setPlatformIds(p: string[]): void;
  setAvailable(b: boolean): void;
}) => {
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    // update the search criteria if the url params change
    if (
      initialSearch !== search ||
      initialPlatforms !== platformIds ||
      initialAvailable !== available
    ) {
      setPage(0);
      setSearch(initialSearch);
      setPlatformIds(initialPlatforms);
      setAvailable(initialAvailable);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPlatforms, initialSearch, initialAvailable]);

  // if the url params are cleared we want to immediately flush the debounced search
  useEffect(() => {
    if (!search && latentSearch) {
      flush();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
};

// when the search criteria changes we want to update the url params
const useSyncUrl = ({
  latentSearch,
  search,
  platformIds,
  available,
}: {
  latentSearch: string;
  search: string;
  platformIds: string[];
  available: boolean;
}) => {
  const history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams('');
    if (latentSearch && latentSearch === search) {
      params.append('q', latentSearch);
    }
    if (platformIds.length) {
      platformIds.forEach((id) => {
        params.append('platforms', id);
      });
    }
    if (available) {
      params.append('available', 'true');
    }

    history.replace({ search: params.toString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, platformIds, latentSearch, available]);
};

export default function Browse() {
  const { initialAvailable, initialPlatforms, initialSearch } =
    useInitialValues();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(initialSearch);
  const [platformIds, setPlatformIds] = useState<string[]>(initialPlatforms);
  const [available, setAvailable] = useState(initialAvailable);
  const [latentSearch, { flush }] = useDebounce(search, 500);

  const platformsQuery = usePlatforms();
  const gamesQuery = useGames({
    search: latentSearch,
    page,
    platforms: platformIds,
    available,
  });
  const gamesCountsQuery = useCounts({
    available,
    platforms: platformIds,
    search: latentSearch,
  });
  const listingsCountsQuery = useListingsCounts(gamesQuery);
  const hasSearched = Boolean(latentSearch) || platformIds.length > 0;

  useResetParams({
    available,
    initialAvailable,
    initialPlatforms,
    initialSearch,
    platformIds,
    search,
    latentSearch,
    flush,
    setAvailable,
    setPage,
    setPlatformIds,
    setSearch,
  });

  useSyncUrl({ available, latentSearch, platformIds, search });

  useEffect(() => {
    setPage(0);
  }, [platformIds, search]);

  return (
    <Screen
      gamesQuery={gamesQuery}
      platformsQuery={platformsQuery}
      listingsCountsQuery={listingsCountsQuery}
      gamesCountsQuery={gamesCountsQuery}
      search={search}
      platformIds={platformIds}
      onSearch={setSearch}
      setPlatformIds={setPlatformIds}
      hasSearched={hasSearched}
      setPage={setPage}
      available={available}
      setAvailable={setAvailable}
    >
      <Suspense fallback={<LoadingPage />}>
        <Items
          gamesQuery={gamesQuery}
          platformsQuery={platformsQuery}
          platformIds={platformIds}
          listingsCountsQuery={listingsCountsQuery}
        />
      </Suspense>
    </Screen>
  );
}
