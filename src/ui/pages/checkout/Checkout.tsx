/* eslint-disable */
import { useBasket, useSubmitBasket } from 'application/basket';
import React from 'react';
import Button from 'ui/elements/Button';

export default function CheckoutPage() {
  const { data: basket } = useBasket();
  const { action } = useSubmitBasket();

  return (
    <div>
      <ul>
        {basket?.items?.map(({ id, listingId }) => (
          <li>
            {id}
            {' - '}
            {listingId}
          </li>
        ))}
      </ul>
      <Button kind="primary" onClick={action}>
        Place your fake order now!
      </Button>
    </div>
  );
}
