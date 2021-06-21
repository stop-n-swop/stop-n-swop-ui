import { QueryOptions, useQuery } from '@respite/query';
import { AddressKey } from 'application/keys';
import { encase } from 'react-jpex';
import type { FetchAddress } from 'core/listings';

export const useAddress = encase(
  (fetch: FetchAddress) =>
    ({ listingId }: { listingId: string }, opts?: QueryOptions) => {
      return useQuery(
        AddressKey,
        () => fetch({ listingId }),
        [listingId],
        opts,
      );
    },
);
