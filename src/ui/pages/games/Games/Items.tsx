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
}: {
  platformsQuery: Query<Platform[]>;
  gamesQuery: Query<{ games: Game[]; nextPage: number }>;
  listingsCountsQuery: ReturnType<typeof useListingsCounts>;
  platformIds: string[];
}) {
  const {
    data: { games },
  } = gamesQuery;
  const { data: platforms } = platformsQuery;
  const { data: listingsCounts } = listingsCountsQuery;
  const totalResults = games.length;
  const cascade = useCascade(totalResults);

  let i = -1;

  return (
    <>
      {games.map((game) => {
        if (platformIds.length && !platformIds.includes(game.platformId)) {
          return null;
        }

        const platform = platforms.find(
          (platform) => platform.id === game.platformId,
        );
        const totalListings =
          listingsCounts.find((row) => row.productId === game.id)?.count ?? 0;

        if (platform == null) {
          return null;
        }

        i += 1;

        return (
          <Item
            key={game.id}
            game={game}
            platform={platform}
            totalListings={totalListings}
            style={cascade(i)}
          />
        );
      })}
    </>
  );
}
