import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useResolve } from 'react-jpex';
import { useParams } from 'react-router-dom';
import { useMyOrder } from 'application/orders';
import { useListing } from 'application/listings';
import type { Config } from 'core/io';
import Payment from './Payment';

// TODO: advanced cards https://developer.paypal.com/docs/business/checkout/advanced-card-payments/

export default function PaymentProvider() {
  const config = useResolve<Config>();
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order } = useMyOrder({ id: orderId });
  const { data: listing } = useListing({ id: order.listingId });

  return (
    <PayPalScriptProvider
      options={{
        'client-id': config.paypal.clientId,
        components: 'buttons',
        currency: listing.currency,
        debug: process.env.NODE_ENV !== 'production',
        intent: 'capture',
        'data-page-type': 'checkout',
      }}
    >
      <Payment />
    </PayPalScriptProvider>
  );
}
