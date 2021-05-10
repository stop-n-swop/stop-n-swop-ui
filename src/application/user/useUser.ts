import { QueryOptions, useQuery } from '@respite/query';
import type { GetUser } from 'core/user';
import { encase } from 'react-jpex';
import { UserKey } from 'application/keys';

export const useUser = encase((getUser: GetUser) => (opts?: QueryOptions) => {
  return useQuery(UserKey, getUser, [], opts);
});
