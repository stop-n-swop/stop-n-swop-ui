import { QueryOptions, useQuery } from '@respite/query';
import { MyListingsKey } from 'application/keys';
import { encase } from 'react-jpex';
import type { FetchMyListings } from 'core/listings';

export const useMyListings = encase(
  (fetchMyListings: FetchMyListings) => (opts?: QueryOptions) => {
    return useQuery(MyListingsKey, fetchMyListings, [], {
      ttl: 30000,
      ...opts,
    });
  },
);
