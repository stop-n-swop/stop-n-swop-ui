import { useSelector } from '@respite/select';
import { ListingNotFoundError } from '@sns/abyss';
import type { QueryOptions } from '@respite/query';
import { useMyListings } from './useMyListings';

export const useMyListing = ({ id }: { id: string }, opts?: QueryOptions) => {
  const query = useMyListings(opts);
  return useSelector(query, (listings) => {
    const listing = listings.find((listing) => listing.id === id);
    if (listing == null) {
      throw new ListingNotFoundError(id);
    }
    return listing;
  });
};
