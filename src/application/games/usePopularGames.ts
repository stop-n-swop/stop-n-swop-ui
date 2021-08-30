import { useCache } from '@respite/core';
import { QueryOptions, useQuery } from '@respite/query';
import { GameKey, PopularGamesKey } from 'application/keys';
import { encase } from 'react-jpex';
import type { FetchPopularGames } from 'core/games';

export const usePopularGames = encase(
  (fetch: FetchPopularGames) => (opts?: QueryOptions) => {
    const cache = useCache();

    return useQuery(
      PopularGamesKey,
      async () => {
        const games = await fetch();
        games.forEach((game) => {
          cache.success([GameKey, game.id], game);
        });
        return games;
      },
      [],
      opts,
    );
  },
);
