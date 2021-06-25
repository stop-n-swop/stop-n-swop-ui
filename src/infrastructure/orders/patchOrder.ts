import jpex from 'jpex';
import type {
  PatchOrderRequest,
  PatchOrderResponse,
} from '@sns/contracts/order';
import type { AuthDriver } from 'core/io';
import type { PatchOrder } from 'core/orders';

const patchOrder =
  (driver: AuthDriver): PatchOrder =>
  async ({ orderId, ...data }) => {
    await driver<PatchOrderRequest, PatchOrderResponse>({
      url: '/orders/{orderId}',
      params: { orderId },
      method: 'PATCH',
      data,
    });
  };

jpex.factory<PatchOrder>(patchOrder);
