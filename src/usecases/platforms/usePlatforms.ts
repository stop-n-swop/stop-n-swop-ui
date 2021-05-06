import { QueryOptions, useQuery } from '@respite/query';
import type { FetchPlatforms } from 'ports/platforms';
import { encase } from 'react-jpex';
import { PlatformsKey } from 'usecases/keys';

export const usePlatforms = encase(
  (fetch: FetchPlatforms) => (opts?: QueryOptions) => {
    return useQuery(
      PlatformsKey,
      () => {
        return fetch();
      },
      [],
      opts,
    );
  },
);
