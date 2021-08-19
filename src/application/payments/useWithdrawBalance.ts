import { useAction } from '@respite/action';
import { WithdrawBalanceKey } from 'application/keys';
import { encase } from 'react-jpex';
import type { WithdrawBalance } from 'core/payments';
import type { Emit } from 'core/events';

type Args = Parameters<WithdrawBalance>[0];

export const useWithdrawBalance = encase(
  (withdraw: WithdrawBalance, emit: Emit) => () => {
    return useAction(
      WithdrawBalanceKey,
      async (args: Args) => {
        const result = await withdraw(args);
        emit('manual_withdrawal', { amount: args.amount, currency: 'GBP' });
        return result;
      },
      [],
    );
  },
);
