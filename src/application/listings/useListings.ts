import { QueryOptions, useQuery } from '@respite/query';
import { ListingKey, ListingsKey } from 'application/keys';
import { encase } from 'react-jpex';
import { useCache } from '@respite/core';
import type { SearchListings } from 'core/listings';

type Args = Parameters<SearchListings>[0];

export const useListings = encase(
  (searchListings: SearchListings) => (args: Args, opts?: QueryOptions) => {
    const {
      productId,
      boxed,
      condition,
      instructions,
      maxPrice,
      minPrice,
      rating,
      region,
      status,
    } = args;
    const cache = useCache();

    return useQuery(
      ListingsKey,
      async () => {
        const result = await searchListings(args);
        result.forEach((listing) => {
          cache.success([ListingKey, listing.id], listing);
        });
        return result;
      },
      [
        productId,
        boxed,
        instructions,
        maxPrice,
        minPrice,
        rating,
        status,
        [...(condition || [])].join(','),
        [...(region || [])].join(','),
      ],
      {
        ttl: 30000,
        ...opts,
      },
    );
  },
);
