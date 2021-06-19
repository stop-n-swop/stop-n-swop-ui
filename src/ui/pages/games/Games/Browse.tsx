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

export default function Browse() {
  const mountedRef = useRef(false);
  const initialSearch = useQueryParam<string>('q', { default: '' });
  const initialPlatforms = useQueryParam<string[]>('platforms', {
    array: true,
  });
  const initialAvailable = useQueryParam('available', {
    default: false,
    bool: true,
  });
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(initialSearch);
  const [platformIds, setPlatformIds] = useState<string[]>(initialPlatforms);
  const [available, setAvailable] = useState(initialAvailable);
  const [latentSearch] = useDebounce(search, 500);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
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

  useEffect(() => {
    const params = new URLSearchParams('');
    if (latentSearch) {
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
  }, [history, platformIds, latentSearch, available]);

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
