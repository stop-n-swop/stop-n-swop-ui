import { useAction } from '@respite/action';
import { AddToBasketKey } from 'application/keys';
import { encase } from 'react-jpex';
import type { AddToBasket } from 'core/basket';

export const useAddToBasket = encase((addToBasket: AddToBasket) => () => {
  return useAction(
    AddToBasketKey,
    ({ listingId }: { listingId: string }) => addToBasket({ listingId }),
    [],
  );
});
