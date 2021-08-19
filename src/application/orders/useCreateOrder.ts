import { useAction } from '@respite/action';
import { encase } from 'react-jpex';
import { CreateOrderKey } from 'application/keys';
import type { CreateOrder } from 'core/orders';
import type { Emit } from 'core/events';

type Args = Parameters<CreateOrder>[0];

export const useCreateOrder = encase(
  (create: CreateOrder, emit: Emit) => () => {
    return useAction(
      CreateOrderKey,
      async (args: Args) => {
        const result = await create(args);
        emit('order_created', {
          listingId: args.listingId,
          orderId: result.orderId,
        });
        return result;
      },
      [],
    );
  },
);
