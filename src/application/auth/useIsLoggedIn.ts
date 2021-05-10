import type { QueryOptions } from '@respite/query';
import { useTokens } from './useTokens';

export const useIsLoggedIn = (opts?: QueryOptions) => {
  const {
    data: { authToken },
  } = useTokens(opts);

  return Boolean(authToken);
};
