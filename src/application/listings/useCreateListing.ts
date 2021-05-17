import { useAction } from '@respite/action';
import { CreateListingKey } from 'application/keys';
import type { CreateListing } from 'core/listings';
import { encase } from 'react-jpex';

export const useCreateListing = encase((create: CreateListing) => () => {
  return useAction(CreateListingKey, create, []);
});
