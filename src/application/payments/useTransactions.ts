import { useQuery } from '@respite/query';
import { TransactionsKey } from 'application/keys';
import { encase } from 'react-jpex';
import type { FetchTransactions } from 'core/payments';

export const useTransactions = encase((fetch: FetchTransactions) => () => {
  return useQuery(TransactionsKey, fetch, [], { ttl: 60000 });
});
