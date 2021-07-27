import { OrderNotAvailableError } from '@sns/abyss';
import { Status } from '@sns/contracts/order';
import { useAuthGuard } from 'application/auth';
import { useListing } from 'application/listings';
import { useMyOrder, usePlaceOrder } from 'application/orders';
import { useCreateCard } from 'application/payments';
import { useUser } from 'application/user';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { makeCheckoutProcessingPath } from 'ui/constants/paths';
import CardScreen from 'ui/modules/checkout/paymentNew/CardScreen/CardScreen';
import { combineActions } from '../BillingAddress/BillingAddress';

export default function PaymentNew() {
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
  const orderError =
    listing.status === Status.OPEN ? undefined : new OrderNotAvailableError();

  const handleSubmit = formProps.handleSubmit(
    async ({
      cardNumber,
      cvc,
      expiry,
      remember,
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
        remember,
      });
      push(makeCheckoutProcessingPath({ orderId }));
    },
  );

  return (
    <FormProvider {...formProps}>
      <CardScreen
        error={error ?? orderError}
        status={status}
        user={user}
        listing={listing}
        onSubmit={handleSubmit}
      />
    </FormProvider>
  );
}
