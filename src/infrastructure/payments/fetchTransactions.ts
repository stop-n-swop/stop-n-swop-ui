import jpex from 'jpex';
import type { FetchTransactions } from 'core/payments';
import type { GetTransactionsResponse } from '@sns/contracts/payment';
import type { AuthDriver } from 'core/io';

jpex.factory<FetchTransactions>(
  (driver: AuthDriver): FetchTransactions =>
    async () => {
      const {
        data: { transactions },
      } = await driver<void, GetTransactionsResponse>({
        url: '/users/my/transactions',
      });

      return transactions;
    },
);
