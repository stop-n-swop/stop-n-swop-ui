import { Status } from '@sns/contracts/order';
import { useMyOrder } from 'application/orders';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  makeCheckoutCompletePath,
  makeCheckoutPaymentPath,
} from 'ui/constants/paths';
import ProcessingScreen from 'ui/modules/checkout/processing/Screen';

export default function Processing() {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order } = useMyOrder({ id: orderId }, { ttl: 3000 });
  const { push } = useHistory();

  useEffect(() => {
    switch (order.status) {
      case Status.PAYING:
        // still processing
        break;
      case Status.PLACED:
        // order has been placed
        push(makeCheckoutCompletePath({ orderId }));
        break;
      default:
        // any other status means something went wrong
        // most likely set to NOT_PAID but it could also have been
        // declined/cancelled
        push(makeCheckoutPaymentPath({ orderId, failed: true }));
        break;
    }
  }, [order.status, orderId, push]);

  return <ProcessingScreen />;
}
