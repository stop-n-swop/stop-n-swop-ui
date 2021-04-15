import { useAction } from '@respite/action';
import type { LogOut, RefreshTokens, SaveTokens } from 'ports/auth';
import { encase } from 'react-jpex';
import { AuthKey } from 'usecases/keys';
import { useCallback, useEffect } from 'react';
import type { Navigate } from 'ports/navigation';
import { LOGIN } from 'ui/constants/paths';
import { useTokens } from './useTokens';

export const useAuth = encase(
  (
    refreshTokens: RefreshTokens,
    saveTokens: SaveTokens,
    logOut: LogOut,
    navigate: Navigate,
    console: Console,
  ) => () => {
    const { data: tokens } = useTokens();

    const fn = useCallback(async () => {
      const newTokens = await refreshTokens();
      await saveTokens(newTokens);
    }, []);

    const { action } = useAction(AuthKey, fn);

    useEffect(() => {
      if (tokens.refreshToken != null && tokens.authToken == null) {
        action().catch(async (e) => {
          console.error(e);
          await logOut();
          await navigate(LOGIN);
        });
      }
    }, [action, tokens.authToken, tokens.refreshToken]);
  },
);
