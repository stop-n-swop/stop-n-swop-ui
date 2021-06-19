import { QueryOptions, useQuery } from '@respite/query';
import { encase } from 'react-jpex';
import { GamesCountsKey } from 'application/keys';
import type { FetchCounts } from 'core/games';
import type { PromiseType } from 'crosscutting/utils';

type Args = Parameters<FetchCounts>[0];
type Result = PromiseType<ReturnType<FetchCounts>>;

export const useCounts = encase(
  (fetchCounts: FetchCounts) =>
    ({ platforms, search, available }: Args, opts?: QueryOptions) => {
      return useQuery<Result>(
        GamesCountsKey,
        async () => {
          const result = await fetchCounts({
            platforms,
            search,
            available,
          });
          return result;
        },
        [search, platforms.join(','), available],
        {
          ...opts,
          ttl: 30000,
        },
      );
    },
);
