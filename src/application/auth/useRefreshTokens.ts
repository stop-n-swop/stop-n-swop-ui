import { useAction } from '@respite/action';
import type { RefreshTokens, SaveTokens } from 'core/auth';
import { encase } from 'react-jpex';
import { AuthKey } from 'application/keys';

export const useRefreshTokens = encase(
  (refreshTokens: RefreshTokens, saveTokens: SaveTokens) => () => {
    return useAction(
      AuthKey,
      async () => {
        const newTokens = await refreshTokens();
        await saveTokens(newTokens);
      },
      [],
    );
  },
);
