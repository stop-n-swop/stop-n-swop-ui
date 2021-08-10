import jpex from 'jpex';
import type { AuthDriver } from 'core/io';
import type {
  StartOrderBody,
  StartOrderResponse,
} from '@sns/contracts/payment';
import type { StartPayment } from 'core/payments';

jpex.factory<StartPayment>(
  (driver: AuthDriver): StartPayment =>
    async ({ orderId }) => {
      const {
        data: { paymentId },
      } = await driver<StartOrderBody, StartOrderResponse>({
        url: '/orders/{orderId}/start',
        method: 'POST',
        params: { orderId },
        data: {},
      });

      return { paymentId };
    },
);
