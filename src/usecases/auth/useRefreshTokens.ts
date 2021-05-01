import { useAction } from '@respite/action';
import type { RefreshTokens, SaveTokens } from 'ports/auth';
import { encase } from 'react-jpex';
import { AuthKey } from 'usecases/keys';

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
