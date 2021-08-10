import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useHistory, useParams } from 'react-router-dom';
import { useCompletePayment, useStartPayment } from 'application/payments';
import LoadingPage from 'ui/pages/Loading';
import { makeCheckoutCompletePath } from 'ui/constants/paths';
import { getFinalPrice } from '@sns/contracts/listing';
import { useGetCurrency, useGetMessage } from 'ui/intl';
import { useMyOrder } from 'application/orders';
import { useListing } from 'application/listings';
import FormError from 'ui/elements/FormError';
import background from 'ui/assets/bg-1.jpg';
import { ids } from 'ui/messages';

export default function Payment() {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order } = useMyOrder({ id: orderId });
  const { data: listing } = useListing({ id: order.listingId });
  const startAction = useStartPayment();
  const completeAction = useCompletePayment();
  const [{ isPending }] = usePayPalScriptReducer();
  const { push } = useHistory();
  const g = useGetMessage();
  const getCurrency = useGetCurrency();

  const { action: start } = startAction;
  const { action: complete } = completeAction;
  const error = startAction.error || completeAction.error;

  if (isPending) {
    return <LoadingPage />;
  }

  return (
    <div className="flex-grow flex justify-center items-center relative overflow-y-hidden">
      <div
        className="h-screen w-screen left-0 absolute bg-center pointer-events-none bg-cover filter blur-sm"
        style={{
          top: -45,
          backgroundImage: `url(${background})`,
          zIndex: 0,
        }}
      />
      <div className="bg-white rounded-lg w-full max-w-screen-sm z-10">
        <h1 className="text-gray-900 text-lg py-3 px-10 border-primary-darkest border-b-2">
          {g(ids.checkout.payment.title, {
            amount: getCurrency(getFinalPrice(listing), {
              currency: listing.currency,
            }),
          })}
        </h1>
        <div className="p-10 space-y-12">
          <FormError error={error} />
          <p>{g(ids.checkout.payment.description)}</p>
          <PayPalButtons
            style={{
              color: 'gold',
              label: 'pay',
            }}
            createOrder={async () => {
              const { paymentId } = await start({ orderId });
              return paymentId;
            }}
            onApprove={async () => {
              await complete({ orderId });
              push(makeCheckoutCompletePath({ orderId }));
            }}
          />
        </div>
      </div>
    </div>
  );
}
