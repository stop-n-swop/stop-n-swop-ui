import {
  BASE_CHARGE_RATE,
  PROTECTION_RATE,
  PROVIDER_BASE_COST,
  PROVIDER_BASE_RATE,
  PROVIDER_PAYOUT_COST,
  SCALE_CHARGE_LIMIT,
} from "./constants";
import { Listing } from "./entities";

/** Returns the base price of the listing, not including postage */
export const getBasePrice = (listing: Listing) => {
  return listing.price;
};

/** Returns the postage fee of the listing */
export const getPostage = (listing: Listing) => {
  return listing.postage;
};

/** Returns the total price set by the seller, i.e. base price + postage */
export const getListedPrice = (listing: Listing) => {
  return getBasePrice(listing) + getPostage(listing);
};

/** Returns the amount of order protection that will be deducted from the listed price */
export const getProtectionCharge = (listing: Listing) => {
  return getListedPrice(listing) * PROTECTION_RATE;
};

/** Returns the platform charge that will be deducted from the listed price */
export const getPlatformCharge = (listing: Listing) => {
  return getListedPrice(listing) * BASE_CHARGE_RATE;
};

/** Returns the actual price the customer will pay i.e. price + postage */
export const getFinalPrice = (listing: Listing) => {
  return getListedPrice(listing);
};

/** Returns the price that will show on the storefront. This is like getFinalPrice but without postage */
export const getDisplayPrice = (listing: Listing) => {
  return getBasePrice(listing);
};

/** Returns the amount we expect the payment provider to charge */
export const getProviderCharges = (listing: Listing) => {
  const price = getFinalPrice(listing);
  const cut = price * PROVIDER_BASE_RATE;
  return cut + PROVIDER_BASE_COST + PROVIDER_PAYOUT_COST;
};

/** Returns the amount sns will charge the seller (i.e. order protection + platform charge) */
export const getListingCharges = (listing: Listing) => {
  const protection = getProtectionCharge(listing);
  const platform = getPlatformCharge(listing);
  const provider = getProviderCharges(listing);

  let charge = protection + platform;
  const diff = charge - provider;

  if (diff < SCALE_CHARGE_LIMIT) {
    charge = SCALE_CHARGE_LIMIT - diff;
  }

  return charge;
};

/** Returns the amount the seller will receive for a listing */
export const getListingProfit = (listing: Listing) => {
  return getListedPrice(listing) - getListingCharges(listing);
};

/** Returns the total cut sns will take from the buyer and the seller */
export const getTotalCharges = (listing: Listing) => {
  return getListingCharges(listing);
};

/** Returns the amount sns will have after the payment provider has taken its cut */
export const getProfit = (listing: Listing) => {
  return getTotalCharges(listing) - getProviderCharges(listing);
};
