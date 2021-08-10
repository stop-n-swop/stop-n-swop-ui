import jpex from 'jpex';
import type { AuthDriver } from 'core/io';
import type {
  PlaceOrderRequest,
  PlaceOrderResponse,
} from '@sns/contracts/payment';
import type { CompletePayment } from 'core/payments';

jpex.factory<CompletePayment>(
  (driver: AuthDriver): CompletePayment =>
    async ({ orderId }) => {
      await driver<PlaceOrderRequest, PlaceOrderResponse>({
        url: '/orders/{orderId}/place',
        method: 'POST',
        params: { orderId },
        data: {},
      });
    },
);
