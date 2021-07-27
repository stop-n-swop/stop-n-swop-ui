import { Listing } from "./entities";
/** Returns the base price of the listing, not including postage */
export declare const getBasePrice: (listing: Listing) => number;
/** Returns the postage fee of the listing */
export declare const getPostage: (listing: Listing) => number;
/** Returns the total price set by the seller, i.e. base price + postage */
export declare const getListedPrice: (listing: Listing) => number;
/** Returns the amount of order protection that will be deducted from the listed price */
export declare const getProtectionCharge: (listing: Listing) => number;
/** Returns the platform charge that will be deducted from the listed price */
export declare const getPlatformCharge: (listing: Listing) => number;
/** Returns the actual price the customer will pay i.e. price + postage */
export declare const getFinalPrice: (listing: Listing) => number;
/** Returns the price that will show on the storefront. This is like getFinalPrice but without postage */
export declare const getDisplayPrice: (listing: Listing) => number;
/** Returns the amount we expect the payment provider to charge */
export declare const getProviderCharges: (listing: Listing) => number;
/** Returns the amount sns will charge the seller (i.e. order protection + platform charge) */
export declare const getListingCharges: (listing: Listing) => number;
/** Returns the amount the seller will receive for a listing */
export declare const getListingProfit: (listing: Listing) => number;
/** Returns the total cut sns will take from the buyer and the seller */
export declare const getTotalCharges: (listing: Listing) => number;
/** Returns the amount sns will have after the payment provider has taken its cut */
export declare const getProfit: (listing: Listing) => number;
