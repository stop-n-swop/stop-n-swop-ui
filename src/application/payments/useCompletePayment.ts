import { useAction } from '@respite/action';
import { CompletePaymentKey } from 'application/keys';
import { encase } from 'react-jpex';
import type { CompletePayment } from 'core/payments';

export const useCompletePayment = encase(
  (completePayment: CompletePayment) => () => {
    return useAction(CompletePaymentKey, completePayment, []);
  },
);
