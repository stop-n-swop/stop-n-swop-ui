'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const PROTECTION_RATE = 0.04;
const BASE_CHARGE_RATE = 0.04;
const SCALE_CHARGE_LIMIT = 0;
const PAYOUT_COST = 10;
const PROVIDER_BASE_RATE = 0.019;
const PROVIDER_BASE_COST = 20;
const PROVIDER_PAYOUT_COST = 0;

exports.Condition = void 0;
(function (Condition) {
  Condition["MINT"] = "mint";
  Condition["LIKE_NEW"] = "likeNew";
  Condition["USED"] = "used";
  Condition["POOR"] = "poor";
})(exports.Condition || (exports.Condition = {}));
exports.Region = void 0;
(function (Region) {
  Region["PAL"] = "pal";
  Region["NTSCU"] = "ntscu";
  Region["NTSCC"] = "ntscc";
  Region["NTSCJ"] = "ntscj";
})(exports.Region || (exports.Region = {}));

const getBasePrice = listing => {
  return listing.price;
};
const getPostage = listing => {
  return listing.postage;
};
const getListedPrice = listing => {
  return getBasePrice(listing) + getPostage(listing);
};
const getProtectionCharge = listing => {
  return getListedPrice(listing) * PROTECTION_RATE;
};
const getPlatformCharge = listing => {
  return getListedPrice(listing) * BASE_CHARGE_RATE;
};
const getFinalPrice = listing => {
  return getListedPrice(listing);
};
const getDisplayPrice = listing => {
  return getBasePrice(listing);
};
const getProviderCharges = listing => {
  const price = getFinalPrice(listing);
  const cut = price * PROVIDER_BASE_RATE;
  return cut + PROVIDER_BASE_COST + PROVIDER_PAYOUT_COST;
};
const getListingCharges = listing => {
  getListedPrice(listing);
  const protection = getProtectionCharge(listing);
  const platform = getPlatformCharge(listing);
  const provider = getProviderCharges(listing);
  let charge = protection + platform;
  if (charge - provider < SCALE_CHARGE_LIMIT) {
    charge = SCALE_CHARGE_LIMIT;
  }
  return charge;
};
const getListingProfit = listing => {
  return getListedPrice(listing) - getListingCharges(listing);
};
const getTotalCharges = listing => {
  return getListingCharges(listing);
};
const getProfit = listing => {
  return getTotalCharges(listing) - getProviderCharges(listing);
};

exports.BASE_CHARGE_RATE = BASE_CHARGE_RATE;
exports.PAYOUT_COST = PAYOUT_COST;
exports.PROTECTION_RATE = PROTECTION_RATE;
exports.PROVIDER_BASE_COST = PROVIDER_BASE_COST;
exports.PROVIDER_BASE_RATE = PROVIDER_BASE_RATE;
exports.PROVIDER_PAYOUT_COST = PROVIDER_PAYOUT_COST;
exports.SCALE_CHARGE_LIMIT = SCALE_CHARGE_LIMIT;
exports.getBasePrice = getBasePrice;
exports.getDisplayPrice = getDisplayPrice;
exports.getFinalPrice = getFinalPrice;
exports.getListedPrice = getListedPrice;
exports.getListingCharges = getListingCharges;
exports.getListingProfit = getListingProfit;
exports.getPlatformCharge = getPlatformCharge;
exports.getPostage = getPostage;
exports.getProfit = getProfit;
exports.getProtectionCharge = getProtectionCharge;
exports.getProviderCharges = getProviderCharges;
exports.getTotalCharges = getTotalCharges;
