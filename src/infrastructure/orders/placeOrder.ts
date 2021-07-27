import jpex from 'jpex';
import { makeCheckoutProcessingPath } from 'ui/constants/paths';
import type { PlaceOrder } from 'core/orders';
import type { AuthDriver } from 'core/io';
import type {
  PlaceOrderRequest,
  PlaceOrderResponse,
} from '@sns/contracts/payment';
import type { Navigate } from 'core/navigation';

jpex.factory<PlaceOrder>(
  (driver: AuthDriver, location: Location, navigate: Navigate): PlaceOrder =>
    async ({ orderId, cardId }) => {
      const secureModeReturnUrl =
        location.origin + makeCheckoutProcessingPath({ orderId });

      const {
        data: { secureMode, secureModeUrl },
      } = await driver<PlaceOrderRequest, PlaceOrderResponse>({
        url: '/orders/{orderId}/place',
        method: 'POST',
        params: { orderId },
        data: {
          cardId,
          secureModeReturnUrl,
        },
      });

      if (secureMode && secureModeUrl) {
        await navigate(secureModeUrl);
      }
    },
);
