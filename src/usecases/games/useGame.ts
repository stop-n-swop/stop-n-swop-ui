import { QueryOptions, useQuery } from '@respite/query';
import type { FetchGame } from 'ports/games';
import { encase } from 'react-jpex';
import { GameKey } from 'usecases/keys';

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
