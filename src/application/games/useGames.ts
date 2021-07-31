import { QueryOptions, useQuery } from '@respite/query';
import { encase } from 'react-jpex';
import { GameKey, GamesKey } from 'application/keys';
import { useCache } from '@respite/core';
import { useEffect, useRef } from 'react';
import { useSelector } from '@respite/select';
import { SHORT_TTL } from 'domain/constants';
import type { SearchGames } from 'core/games';
import type { Game } from '@sns/contracts/product';

// TODO: make an npm library for this
export const useInfiniteQuery = <T>(
  key: any, // a unique key for the query
  index: number, // the current page
  fetch: (previous: T) => Promise<T>,
  deps: any[] = [], // any deps this query relies on
  {
    initialState = [] as unknown as T,
    ...opts
  }: QueryOptions & { initialState?: T } = {},
) => {
  const ref = useRef<T>(initialState);
  const query = useQuery<T>(
    key,
    async () => {
      // this sucks but we basically have to wait for an arbitrary
      // amount of time before triggering the next fetch, otherwise
      // we can end up with infinite re-renders
      await new Promise((res) => setTimeout(res, 100));
      ref.current = await fetch(ref.current);
      return ref.current;
    },
    [index, ...deps],
    opts,
  );

  // if deps changes we want to completely reset the state
  // and start afresh
  useEffect(() => {
    ref.current = initialState;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return query;
};

type Args = Parameters<SearchGames>[0];
type Result = {
  nextPage: number;
  games: Array<Array<Game>>;
};

const usePagedGames = encase(
  (searchGames: SearchGames) =>
    ({ page, platforms, search, available }: Args, opts?: QueryOptions) => {
      const cache = useCache();

      return useInfiniteQuery<Result>(
        GamesKey,
        page,
        async (previous) => {
          const result = await searchGames({
            page,
            platforms,
            search,
            available,
          });
          result.games?.forEach((game) => {
            cache.success([GameKey, game.id], game);
          });
          const games = [...previous.games];
          games[page] = result.games;
          return {
            nextPage: result.nextPage,
            games,
          };
        },
        [search, platforms.join(','), available],
        {
          initialState: {
            nextPage: -1,
            games: [],
          },
          ttl: available ? SHORT_TTL : undefined,
          ...opts,
        },
      );
    },
);

export const useGames = (args: Args, opts?: QueryOptions) => {
  const query = usePagedGames(args, opts);
  return useSelector(query, (result) => {
    return {
      nextPage: result.nextPage,
      games: result.games.flatMap((games) => games ?? []),
    };
  });
};
