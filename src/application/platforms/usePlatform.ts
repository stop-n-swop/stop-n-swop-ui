import type { QueryOptions } from '@respite/query';
import { useSelector } from '@respite/select';
import { usePlatforms } from './usePlatforms';

export const usePlatform = ({ id }: { id: string }, opts?: QueryOptions) => {
  const platformsQuery = usePlatforms(opts);
  return useSelector(platformsQuery, (platforms) =>
    platforms.find((platform) => platform.id === id),
  );
};
