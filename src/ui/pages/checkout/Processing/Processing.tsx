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
    if (order.status === Status.PAID) {
      push(makeCheckoutCompletePath({ orderId }));
    } else if (order.status === Status.NOT_PAID) {
      push(makeCheckoutPaymentPath({ orderId, failed: true }));
    } else if (order.status !== Status.PLACED) {
      push(makeCheckoutPaymentPath({ orderId, failed: true }));
    }
  }, [order.status, orderId, push]);

  return <ProcessingScreen />;
}
