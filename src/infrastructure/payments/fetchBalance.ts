import jpex from 'jpex';
import type { FetchBalance } from 'core/payments';
import type { AuthDriver } from 'core/io';
import type { GetBalanceResponse } from '@sns/contracts/payment';

jpex.factory<FetchBalance>(
  (driver: AuthDriver): FetchBalance =>
    async () => {
      const {
        data: { balance, currency },
      } = await driver<void, GetBalanceResponse>({
        url: '/users/my/balance',
      });

      return { balance, currency };
    },
);
