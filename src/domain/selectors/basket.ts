import type { Basket } from '@sns/contracts/basket';

export const isInBasket = (listingId: string, basket: Basket) => {
  if (basket == null || basket.items.length === 0) {
    return false;
  }
  return basket.items.some((item) => item.listingId === listingId);
};
