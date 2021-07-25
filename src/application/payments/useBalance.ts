import { useQuery } from '@respite/query';
import { BalanceKey } from 'application/keys';
import { encase } from 'react-jpex';
import type { FetchBalance } from 'core/payments';

export const useBalance = encase((fetch: FetchBalance) => () => {
  return useQuery(BalanceKey, fetch, [], { ttl: 60000 });
});
