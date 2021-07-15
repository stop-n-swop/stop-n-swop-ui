export const CHECKOUT = '/checkout/:listingId';
export const makeCheckoutPath = ({ listingId }: { listingId: string }) =>
  `/checkout/${listingId}`;

export const BILLING_ADDRESS = '/checkout/:orderId/billing';
export const makeBillingAddressPath = ({ orderId }: { orderId: string }) =>
  `/checkout/${orderId}/billing`;

export const DELIVERY_ADDRESS = '/checkout/:orderId/delivery';
export const makeDeliveryAddressPath = ({ orderId }: { orderId: string }) =>
  `/checkout/${orderId}/delivery`;

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
export const CHECKOUT_PROCESSING = '/checkout/:orderId/process';
export const makeCheckoutProcessingPath = ({ orderId }: { orderId: string }) =>
  `/checkout/${orderId}/process`;
export const CHECKOUT_COMPLETE = '/checkout/:orderId/complete';
export const makeCheckoutCompletePath = ({ orderId }: { orderId: string }) =>
  `/checkout/${orderId}/complete`;

export const makeContinueCheckoutPath = makeBillingAddressPath;
