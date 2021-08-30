import { QueryOptions, useQuery } from '@respite/query';
import { ListingKey, SuggestionsKey } from 'application/keys';
import { encase } from 'react-jpex';
import { useCache } from '@respite/core';
// import { SHORT_TTL } from 'domain/constants';
import type { FetchSuggestions } from 'core/listings';

export const useSuggestions = encase(
  (fetch: FetchSuggestions) => (opts?: QueryOptions) => {
    const cache = useCache();

    return useQuery(
      SuggestionsKey,
      async () => {
        const listings = await fetch();
        listings.forEach((listing) => {
          cache.success([ListingKey, listing.id], listing);
        });
        return listings;
      },
      [],
      {
        // ttl: SHORT_TTL,
        ...opts,
      },
    );
  },
);
