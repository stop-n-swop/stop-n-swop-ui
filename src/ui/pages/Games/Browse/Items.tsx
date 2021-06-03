import React from 'react';
import { useCascade } from 'ui/hooks';
import type { useListingsCounts } from 'application/listings';
import type { Query } from '@respite/core';
import type { Game, Platform } from '@sns/contracts/product';
import Item from './Item';

export default function Items({
  platformsQuery,
  gamesQuery,
  listingsCountsQuery,
  platformIds,
  available,
}: {
  platformsQuery: Query<Platform[]>;
  gamesQuery: Query<{ games: Game[]; nextPage: number; counts: any }>;
  listingsCountsQuery: ReturnType<typeof useListingsCounts>;
  platformIds: string[];
  available: boolean;
}) {
  const {
    data: { games },
  } = gamesQuery;
  const { data: platforms } = platformsQuery;
  const { data: listingsCounts } = listingsCountsQuery;
  const totalResults = games.reduce((total, game) => {
    return total + game.platforms.length;
  }, 0);
  const cascade = useCascade(totalResults);

  let i = -1;

  return (
    <>
      {games.map((game) =>
        game.platforms.map(({ id }) => {
          if (platformIds.length && !platformIds.includes(id)) {
            return null;
          }

          const platform = platforms.find((platform) => platform.id === id);
          const totalListings =
            listingsCounts.find(
              (row) => row.platformId === id && row.productId === game.id,
            )?.count ?? 0;

          if (platform == null) {
            return null;
          }
          if (available && totalListings === 0) {
            return null;
          }

          i += 1;

          return (
            <Item
              key={`${game.id}-${id}`}
              game={game}
              platform={platform}
              totalListings={totalListings}
              style={cascade(i)}
            />
          );
        }),
      )}
    </>
  );
}
