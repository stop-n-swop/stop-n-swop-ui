import { useAction } from '@respite/action';
import { PlaceOrderKey } from 'application/keys';
import { encase } from 'react-jpex';
import type { PlaceOrder } from 'core/orders';

export const usePlaceOrder = encase((placeOrder: PlaceOrder) => () => {
  return useAction(PlaceOrderKey, placeOrder, []);
});
