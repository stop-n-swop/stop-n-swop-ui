import { useAction } from '@respite/action';
import { UpdateListingKey } from 'application/keys';
import { encase } from 'react-jpex';
import type { UpdateListing } from 'core/listings';

export const useUpdateListing = encase((update: UpdateListing) => () => {
  return useAction(UpdateListingKey, update, []);
});
