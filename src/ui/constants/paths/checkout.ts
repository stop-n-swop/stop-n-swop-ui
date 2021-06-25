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
export const makeCheckoutPaymentPath = ({ orderId }: { orderId: string }) =>
  `/checkout/${orderId}/payment`;

export const makeContinueCheckoutPath = makeBillingAddressPath;
