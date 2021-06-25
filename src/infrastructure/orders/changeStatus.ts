import jpex from 'jpex';
import type {
  UpdateOrderStatusRequest,
  UpdateOrderStatusResponse,
} from '@sns/contracts/order';
import type { AuthDriver } from 'core/io';
import type { ChangeStatus } from 'core/orders';

const changeStatus =
  (driver: AuthDriver): ChangeStatus =>
  async ({ orderId, status }) => {
    await driver<UpdateOrderStatusRequest, UpdateOrderStatusResponse>({
      url: '/orders/{orderId}/status',
      params: { orderId },
      method: 'POST',
      data: {
        status,
      },
    });
  };

jpex.factory<ChangeStatus>(changeStatus);
