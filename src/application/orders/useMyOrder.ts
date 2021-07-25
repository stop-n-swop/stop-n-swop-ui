import { useSelector } from '@respite/select';
import { OrderNotFoundError } from '@sns/abyss';
import type { QueryOptions } from '@respite/query';
import { useMyOrders } from './useMyOrders';

export const useMyOrder = ({ id }: { id: string }, opts?: QueryOptions) => {
  const query = useMyOrders(opts);
  return useSelector(query, (orders) => {
    const order = orders.find((order) => order.id === id);
    if (order == null) {
      throw new OrderNotFoundError(id);
    }
    return order;
  });
};
