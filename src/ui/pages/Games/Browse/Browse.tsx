import React, { useEffect, useRef, useState } from 'react';
import Screen from 'ui/modules/games/browse/Screen';
import { usePlatforms } from 'application/platforms';
import { useGames } from 'application/games';
import { isEmpty } from 'crosscutting/utils';
import { Status } from '@respite/core';
import { useHistory } from 'react-router-dom';
import { useQueryParam } from 'ui/hooks';
import Items from './Items';

export default function Browse() {
  const mountedRef = useRef(false);
  const initialSearch = useQueryParam<string>('q', { default: '' });
  const initialPlatforms = useQueryParam<string[]>('platforms', {
    array: true,
  });
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(initialSearch);
  const [platformIds, setPlatformIds] = useState<string[]>(initialPlatforms);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (initialSearch !== search || initialPlatforms !== platformIds) {
      setPage(0);
      setSearch(initialSearch);
      setPlatformIds(initialPlatforms);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPlatforms, initialSearch]);

  const platformsQuery = usePlatforms();
  const gamesQuery = useGames({
    search,
    page,
    platforms: platformIds,
  });
  const hasSearched =
    (gamesQuery.status === Status.SUCCESS ||
      gamesQuery.status === Status.FETCHING) &&
    gamesQuery.data.games != null &&
    (Boolean(search) || !isEmpty(platformIds));

  useEffect(() => {
    const params = new URLSearchParams('');
    if (search) {
      params.append('q', search);
    }
    if (platformIds.length) {
      platformIds.forEach((id) => {
        params.append('platforms', id);
      });
    }

    history.replace({ search: params.toString() });
  }, [history, platformIds, search]);

  useEffect(() => {
    setPage(0);
  }, [platformIds, search]);

  return (
    <Screen
      gamesQuery={gamesQuery}
      platformsQuery={platformsQuery}
      search={search}
      platformIds={platformIds}
      onSearch={setSearch}
      setPlatformIds={setPlatformIds}
      hasSearched={hasSearched}
      setPage={setPage}
    >
      <Items
        gamesQuery={gamesQuery}
        platformsQuery={platformsQuery}
        platformIds={platformIds}
      />
    </Screen>
  );
}
