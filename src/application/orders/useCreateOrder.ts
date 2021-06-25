import { useAction } from '@respite/action';
import { encase } from 'react-jpex';
import { CreateOrderKey } from 'application/keys';
import type { CreateOrder } from 'core/orders';

export const useCreateOrder = encase((create: CreateOrder) => () => {
  return useAction(CreateOrderKey, create, []);
});
