import { QueryOptions, useQuery } from '@respite/query';
import type { GetTokens } from 'core/auth';
import { encase } from 'react-jpex';
import { TokensKey } from 'application/keys';

export const useTokens = encase(
  (getTokens: GetTokens) => (opts?: QueryOptions) => {
    return useQuery(TokensKey, getTokens, [], opts);
  },
);
