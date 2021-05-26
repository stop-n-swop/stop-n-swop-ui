import { useSelector } from '@respite/select';
import type { QueryOptions } from '@respite/query';
import { useMyListings } from './useMyListings';

export const useMyListing = ({ id }: { id: string }, opts?: QueryOptions) => {
  const query = useMyListings(opts);
  return useSelector(query, (listings) =>
    listings.find((listing) => listing.id === id),
  );
};
