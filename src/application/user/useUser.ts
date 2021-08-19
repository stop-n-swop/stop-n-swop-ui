import { QueryOptions, useQuery } from '@respite/query';
import { encase } from 'react-jpex';
import { UserKey } from 'application/keys';
import type { GetUser } from 'core/user';

export const useUser = encase(
  (getUser: GetUser) =>
    ({ username }: { username?: string } = {}, opts?: QueryOptions) => {
      return useQuery(UserKey, () => getUser({ username }), [username], opts);
    },
);
