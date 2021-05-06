import React from 'react';
import { useCascade } from 'ui/hooks';
import type { Query } from '@respite/core';
import type { Game, Platform } from '@sns/contracts/product';
import Item from './Item';

export default function Items({
  platformsQuery,
  gamesQuery,
  platformIds,
}: {
  platformsQuery: Query<Platform[]>;
  gamesQuery: Query<{ games: Game[] }>;
  platformIds: string[];
}) {
  const {
    data: { games },
  } = gamesQuery;
  const { data: platforms } = platformsQuery;
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

          if (platform == null) {
            return null;
          }

          i += 1;

          return (
            <Item
              key={`${game.id}-${id}`}
              game={game}
              platform={platform}
              style={cascade(i)}
            />
          );
        }),
      )}
    </>
  );
}
