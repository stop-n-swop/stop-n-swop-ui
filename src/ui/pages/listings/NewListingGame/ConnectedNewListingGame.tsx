import React, { useEffect, useState } from 'react';
import { useGame, useGames } from 'application/games';
import { useDebounce } from 'use-debounce';
import { usePlatforms } from 'application/platforms';
import { Status } from '@respite/core';
import NewListing from './NewListingGame';

export default function ConnectedNewListing() {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [productId, setProductId] = useState('');
  const gamesQuery = useGames({
    search: debouncedSearch,
    page: 0,
    available: null,
    platforms: [],
  });
  const loaded = gamesQuery.status === Status.SUCCESS;
  const loading = [Status.LOADING, Status.FETCHING].includes(gamesQuery.status);
  // we only want to fetch the games when you've started searching
  const games = loaded && debouncedSearch ? gamesQuery.data.games : [];
  const { data: platforms } = usePlatforms();
  const gameQuery = useGame({ id: productId }, { suspendOnRefetch: true });

  useEffect(() => {
    // rather than causing the app to suspend, we want to silently trigger the fetch once you've started searching
    if (debouncedSearch && gamesQuery.status === Status.IDLE) {
      gamesQuery.resolve();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <NewListing
      onSearch={setSearch}
      productId={productId}
      setProductId={setProductId}
      results={games}
      platforms={platforms}
      gameQuery={gameQuery}
      loading={loading}
    />
  );
}
