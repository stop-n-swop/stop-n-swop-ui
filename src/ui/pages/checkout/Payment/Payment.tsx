import { PaymentFailedError, hydrate, UnknownError } from '@sns/abyss';
import { Order, Status } from '@sns/contracts/order';
import { useAuthGuard } from 'application/auth';
import { useListing } from 'application/listings';
import { useMyOrder, usePlaceOrder } from 'application/orders';
import { useCards } from 'application/payments';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  makeCheckoutPaymentNewPath,
  makeCheckoutProcessingPath,
} from 'ui/constants/paths';
import { useQueryParam } from 'ui/hooks';
import PaymentScreen from 'ui/modules/checkout/payment/PaymentScreen';
import Cards from 'ui/modules/checkout/payment/Cards';
import NewCard from 'ui/modules/checkout/payment/NewCard';
import SubmitCard from 'ui/modules/checkout/payment/SubmitCard/SubmitCard';

const getError = (error: any, order: Order, retry: boolean) => {
  if (error) {
    return error;
  }
  if (order.status === Status.NOT_PAID && order.errorCode) {
    const error = hydrate(`M${order.errorCode}`);
    if (error.constructor === UnknownError) {
      return new PaymentFailedError();
    }
    return error;
  }
  if (retry) {
    return new PaymentFailedError();
  }
  return null;
};

export default function Payment() {
  useAuthGuard({
    username: true,
    details: true,
  });
  const retry = useQueryParam('retry') === 'true';
  const { push } = useHistory();
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order } = useMyOrder({ id: orderId });
  const { data: listing } = useListing({ id: order.listingId });
  const { data: cards } = useCards();
  const { action: placeOrder, status, error: placOrderError } = usePlaceOrder();
  const error = useMemo(
    () => getError(placOrderError, order, retry),
    [order, placOrderError, retry],
  );

  const [cardId, setCardId] = useState<string>(cards[0]?.id);

  const handleSubmit = async () => {
    await placeOrder({
      cardId,
      orderId,
    });
    push(makeCheckoutProcessingPath({ orderId }));
  };

  useEffect(() => {
    if (!cards.length) {
      push(makeCheckoutPaymentNewPath({ orderId }));
    }
  }, [cards.length, orderId, push]);

  return (
    <PaymentScreen
      error={error}
      cards={<Cards cardId={cardId} setCardId={setCardId} cards={cards} />}
      newCard={<NewCard orderId={orderId} />}
      submitCard={
        <SubmitCard listing={listing} status={status} onSubmit={handleSubmit} />
      }
    />
  );
}
