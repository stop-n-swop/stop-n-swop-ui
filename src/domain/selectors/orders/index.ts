import { Order, Status } from '@sns/contracts/order';

export const isOrderComplete = (order: Order) =>
  [
    Status.RECEIVED,
    Status.CANCELLED,
    Status.DECLINED,
    Status.COMPLETE,
  ].includes(order.status);

export const doesOrderHaveActions = (order: Order) =>
  [Status.CREATED, Status.PENDING, Status.NOT_PAID, Status.POSTED].includes(
    order.status,
  );
