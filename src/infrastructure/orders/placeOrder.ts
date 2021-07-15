import jpex from 'jpex';
import type { PlaceOrder } from 'core/orders';
import type { AuthDriver } from 'core/io';
import type {
  PlaceOrderRequest,
  PlaceOrderResponse,
} from '@sns/contracts/payment';

jpex.factory<PlaceOrder>(
  (driver: AuthDriver): PlaceOrder =>
    async ({ orderId, cardId }) => {
      await driver<PlaceOrderRequest, PlaceOrderResponse>({
        url: '/orders/{orderId}/place',
        method: 'POST',
        params: { orderId },
        data: {
          cardId,
          secureModeReturnUrl: 'https://google.com',
        },
      });
    },
);
