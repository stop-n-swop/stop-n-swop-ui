import { QueryOptions, useQuery } from '@respite/query';
import type { FetchGame } from 'core/games';
import { encase } from 'react-jpex';
import { GameKey } from 'application/keys';

type Args = Parameters<FetchGame>[0];

export const useGame = encase(
  (fetchGame: FetchGame) => ({ id }: Args, opts?: QueryOptions) => {
    return useQuery(
      GameKey,
      () => {
        return fetchGame({ id });
      },
      [id],
      opts,
    );
  },
);
