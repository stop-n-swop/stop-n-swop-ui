/* eslint-disable */
import { useGame } from 'application/games';
import { useListing } from 'application/listings';
import { useCreateOrder } from 'application/orders';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeContinueCheckoutPath } from 'ui/constants/paths';
import Button from 'ui/elements/Button';
import Card from 'ui/elements/Card';
import FormError from 'ui/elements/FormError';

export default function CheckoutPage() {
  const { listingId } = useParams<{ listingId: string }>();

  const { data: listing } = useListing({ id: listingId });
  const { data: game } = useGame({ id: listing.productIds[0] });
  const { action: createOrder, submitting, error } = useCreateOrder();
  const { push } = useHistory();

  const handleClick = async () => {
    const { orderId } = await createOrder({ listingId });
    push(makeContinueCheckoutPath({ orderId }));
  };

  return (
    <Card className="flex-grow space-y-8 lg:w-2/3 lg:mx-auto lg:flex-grow-0 lg:mt-12">
      <FormError error={error} />
      <p>You're about to buy this thing:</p>
      <p>{game.name}</p>
      <p>{JSON.stringify(listing.stats)}</p>
      <p>
        {listing.price} + {listing.postage}
      </p>
      <Button
        kind="primary"
        state={submitting ? 'pending' : 'none'}
        onClick={handleClick}
      >
        Yeah yeah yeah get on with it
      </Button>
    </Card>
  );
}
