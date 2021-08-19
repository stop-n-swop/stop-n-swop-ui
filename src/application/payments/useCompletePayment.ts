import { useAction } from '@respite/action';
import { CompletePaymentKey } from 'application/keys';
import { encase } from 'react-jpex';
import type { CompletePayment } from 'core/payments';
import type { Emit } from 'core/events';

type Args = Parameters<CompletePayment>[0];

export const useCompletePayment = encase(
  (completePayment: CompletePayment, emit: Emit) => () => {
    return useAction(
      CompletePaymentKey,
      async (args: Args) => {
        const result = await completePayment(args);
        emit('payment_completed', { orderId: args.orderId });
        return result;
      },
      [],
    );
  },
);
