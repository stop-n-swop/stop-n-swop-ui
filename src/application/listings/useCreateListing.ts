import { useAction } from '@respite/action';
import { CreateListingKey } from 'application/keys';
import { encase } from 'react-jpex';
import type { CreateListing } from 'core/listings';
import type { Emit } from 'core/events';

type Args = Parameters<CreateListing>[0];

export const useCreateListing = encase(
  (create: CreateListing, emit: Emit) => () => {
    return useAction(
      CreateListingKey,
      async (args: Args) => {
        const result = await create(args);
        emit('listing_created', {
          currency: args.currency,
          listingId: result.id,
          postage: args.postage,
          price: args.price,
        });
        return result;
      },
      [],
    );
  },
);
