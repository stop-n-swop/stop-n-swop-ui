import { QueryOptions, useQuery } from '@respite/query';
import type { FetchPlatforms } from 'core/platforms';
import { encase } from 'react-jpex';
import { PlatformsKey } from 'application/keys';

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
