/* eslint-disable react/jsx-no-literals */
import { Status } from '@sns/contracts/order';
import { useChangeStatus } from 'application/orders';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeCheckoutCompletePath } from 'ui/constants/paths';
import Button from 'ui/elements/Button';

// TODO: this page
export default function Payment() {
  const { orderId } = useParams<{ orderId: string }>();
  const { action } = useChangeStatus();
  const { push } = useHistory();

  return (
    <div>
      <p>Your payment goes here...</p>
      <Button
        kind="primary"
        onClick={async () => {
          await action({ orderId, status: Status.PLACED });
          push(makeCheckoutCompletePath({ orderId }));
        }}
      >
        Pay now
      </Button>
    </div>
  );
}
