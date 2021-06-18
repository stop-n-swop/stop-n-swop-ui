import React from 'react';
import Order from 'ui/modules/orders/my/orders/Order';
import OrderStatus from 'ui/modules/orders/my/orders/OrderStatus';
import { makeMyOrderPath } from 'ui/constants/paths';
import { useListing } from 'application/listings';
import { useGame } from 'application/games';
import type { Order as IOrder } from '@sns/contracts/order';

export default function MyOrder({ order }: { order: IOrder }) {
  const { data: listing } = useListing({ id: order.listingId });
  const {
    productIds: [productId],
  } = listing;
  const { data: product } = useGame({ id: productId });

  return (
    <Order
      to={makeMyOrderPath({ orderId: order.id })}
      listing={listing}
      product={product}
      orderStatus={<OrderStatus status={order.status} />}
    />
  );
}
