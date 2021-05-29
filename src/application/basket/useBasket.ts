import { QueryOptions, useQuery } from '@respite/query';
import { BasketKey } from 'application/keys';
import { encase } from 'react-jpex';
import type { FetchMyBasket } from 'core/basket';

export const useBasket = encase(
  (fetch: FetchMyBasket) => (opts?: QueryOptions) => {
    return useQuery(BasketKey, fetch, [], opts);
  },
);
