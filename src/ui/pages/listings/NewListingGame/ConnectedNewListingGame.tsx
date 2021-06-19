import React, { useState } from 'react';
import { useAuthGuard } from 'application/auth';
import { useGames } from 'application/games';
import { useParams } from 'react-router-dom';
import NewListing from './NewListingGame';

export default function ConnectedNewListing() {
  useAuthGuard({ username: true });

  const { platformId } = useParams<{ platformId: string }>();
  const [search, setSearch] = useState('');
  const [productId, setProductId] = useState('');
  const {
    data: { games: results },
  } = useGames({
    search,
    page: 0,
    platforms: search ? [platformId] : [],
    available: null,
  });

  return (
    <NewListing
      onSearch={setSearch}
      productId={productId}
      platformId={platformId}
      setProductId={setProductId}
      results={results}
    />
  );
}
