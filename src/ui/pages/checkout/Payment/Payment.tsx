import { useAuthGuard } from 'application/auth';
import { useListing } from 'application/listings';
import { useMyOrder, usePlaceOrder } from 'application/orders';
import { useCreateCard } from 'application/payments';
import { useUser } from 'application/user';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { makeCheckoutProcessingPath } from 'ui/constants/paths';
import CardScreen from 'ui/modules/checkout/payment/CardScreen/CardScreen';
import { combineActions } from '../BillingAddress/BillingAddress';

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
  const { push } = useHistory();

  const { data: order } = useMyOrder({ id: orderId });
  const { data: listing } = useListing({ id: order.listingId });

  const placeAction = usePlaceOrder();
  const createAction = useCreateCard();
  const { error, status } = combineActions(placeAction, createAction);

  const handleSubmit = formProps.handleSubmit(
    async ({
      cardNumber,
      cvc,
      expiry,
    }: {
      cardNumber: string;
      expiry: string;
      cvc: string;
      remember: boolean;
    }) => {
      const { cardId } = await createAction.action({ cardNumber, cvc, expiry });
      await placeAction.action({
        cardId,
        orderId,
      });
      push(makeCheckoutProcessingPath({ orderId }));
    },
  );

  return (
    <FormProvider {...formProps}>
      <CardScreen
        error={error}
        status={status}
        user={user}
        listing={listing}
        onSubmit={handleSubmit}
      />
    </FormProvider>
  );
}
