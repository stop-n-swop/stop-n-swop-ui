import { Status } from '@sns/contracts/order';
import { useAuthGuard } from 'application/auth';
import { useListing } from 'application/listings';
import { useChangeStatus, useMyOrder } from 'application/orders';
import { useUser } from 'application/user';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { makeCheckoutCompletePath } from 'ui/constants/paths';
import CardScreen from 'ui/modules/checkout/payment/CardScreen/CardScreen';

// TODO: this page
export default function Payment() {
  useAuthGuard({
    username: true,
    details: true,
  });
  const formProps = useForm({
    defaultValues: {
      remember: true,
    },
  });
  const { data: user } = useUser();
  const { orderId } = useParams<{ orderId: string }>();
  const { action } = useChangeStatus();
  const { push } = useHistory();

  const { data: order } = useMyOrder({ id: orderId });
  const { data: listing } = useListing({ id: order.listingId });

  const handleSubmit = formProps.handleSubmit(async (values) => {
    console.log(values);
    await action({ orderId, status: Status.PLACED });
    push(makeCheckoutCompletePath({ orderId }));
  });

  return (
    <FormProvider {...formProps}>
      <CardScreen user={user} listing={listing} onSubmit={handleSubmit} />
    </FormProvider>
  );
}
