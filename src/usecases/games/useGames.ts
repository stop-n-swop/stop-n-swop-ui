import { QueryOptions, useQuery } from '@respite/query';
import type { SearchGames } from 'ports/games';
import { encase } from 'react-jpex';
import { GameKey, GamesKey } from 'usecases/keys';
import { useDebounce } from 'use-debounce';
import { useCache } from '@respite/core';
import { useEffect, useRef } from 'react';
import type { PromiseType } from 'crosscutting/utils';

// TODO: make an npm library for this
const useInfiniteQuery = <T>(
  key: any,
  index: number,
  fetch: (previous: T) => Promise<T>,
  deps: any[] = [],
  {
    initialState = ([] as unknown) as T,
    ...opts
  }: QueryOptions & { initialState?: T } = {},
) => {
  const ref = useRef<T>(initialState);
  const query = useQuery<T>(
    key,
    async () => {
      await new Promise((res) => setTimeout(res, 100));
      ref.current = await fetch(ref.current);
      return ref.current;
    },
    [index, ...deps],
    opts,
  );

  useEffect(() => {
    ref.current = initialState;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return query;
};

type Args = Parameters<SearchGames>[0];
type Result = PromiseType<ReturnType<SearchGames>>;

export const useGames = encase(
  (searchGames: SearchGames) => (
    { page, platforms, search }: Args,
    opts?: QueryOptions,
  ) => {
    const cache = useCache();
    const [latentSearch] = useDebounce(search, 500);

    return useInfiniteQuery<Result>(
      GamesKey,
      page,
      async (previous) => {
        const result = await searchGames({
          page,
          platforms,
          search: latentSearch,
        });
        result.games?.forEach((game) => {
          cache.success([GameKey, game.id], game);
        });
        return {
          ...result,
          games: [...previous.games, ...(result.games ?? [])],
        };
      },
      [latentSearch, platforms.join(',')],
      {
        initialState: {
          nextPage: -1,
          games: [],
          counts: { total: 0, platforms: {} },
        },
        ...opts,
      },
    );
  },
);
