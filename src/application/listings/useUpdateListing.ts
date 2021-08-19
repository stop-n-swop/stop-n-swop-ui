import { useAction } from '@respite/action';
import { UpdateListingKey } from 'application/keys';
import { encase } from 'react-jpex';
import type { UpdateListing } from 'core/listings';
import type { Emit } from 'core/events';

type Args = Parameters<UpdateListing>[0];

export const useUpdateListing = encase(
  (update: UpdateListing, emit: Emit) => () => {
    return useAction(
      UpdateListingKey,
      async (args: Args) => {
        const result = await update(args);
        emit('listing_updated', {
          currency: result.currency,
          listingId: result.id,
          postage: result.postage,
          price: result.price,
        });
        return result;
      },
      [],
    );
  },
);
