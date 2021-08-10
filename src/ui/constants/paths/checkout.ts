export const CHECKOUT = '/checkout/:listingId';
export const makeCheckoutPath = ({ listingId }: { listingId: string }) =>
  `/checkout/${listingId}`;

export const CHECKOUT_PAYMENT = '/checkout/:orderId/payment';
export const makeCheckoutPaymentPath = ({
  orderId,
  failed,
}: {
  orderId: string;
  failed?: boolean;
}) => {
  const str = `/checkout/${orderId}/payment`;
  if (failed) {
    return `${str}?retry=true`;
  }
  return str;
};

export const CHECKOUT_COMPLETE = '/checkout/:orderId/complete';
export const makeCheckoutCompletePath = ({ orderId }: { orderId: string }) =>
  `/checkout/${orderId}/complete`;

export const makeContinueCheckoutPath = makeCheckoutPaymentPath;
