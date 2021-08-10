import { useAction } from '@respite/action';
import { StartPaymentKey } from 'application/keys';
import { encase } from 'react-jpex';
import type { StartPayment } from 'core/payments';

export const useStartPayment = encase((startPayment: StartPayment) => () => {
  return useAction(StartPaymentKey, startPayment, []);
});
