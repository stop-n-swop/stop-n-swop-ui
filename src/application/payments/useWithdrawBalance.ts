import { useAction } from '@respite/action';
import { WithdrawBalanceKey } from 'application/keys';
import { encase } from 'react-jpex';
import type { WithdrawBalance } from 'core/payments';

export const useWithdrawBalance = encase((withdraw: WithdrawBalance) => () => {
  return useAction(WithdrawBalanceKey, withdraw, []);
});
