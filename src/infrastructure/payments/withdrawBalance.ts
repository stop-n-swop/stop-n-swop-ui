import jpex from 'jpex';
import type { WithdrawBalance } from 'core/payments';
import type { AuthDriver } from 'core/io';
import type { WithdrawBalanceRequest } from '@sns/contracts/payment';

jpex.factory<WithdrawBalance>(
  (driver: AuthDriver): WithdrawBalance =>
    async ({ amount }) => {
      await driver<WithdrawBalanceRequest>({
        url: '/users/my/balance',
        method: 'POST',
        data: {
          amount,
        },
      });

      await new Promise((res) => setTimeout(res, 3000));
    },
);
