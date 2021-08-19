import { useAction } from '@respite/action';
import { StartPaymentKey } from 'application/keys';
import { encase } from 'react-jpex';
import type { StartPayment } from 'core/payments';
import type { Emit } from 'core/events';

type Args = Parameters<StartPayment>[0];

export const useStartPayment = encase(
  (startPayment: StartPayment, emit: Emit) => () => {
    return useAction(
      StartPaymentKey,
      async (args: Args) => {
        const result = await startPayment(args);
        emit('payment_started', { orderId: args.orderId });
        return result;
      },
      [],
    );
  },
);
