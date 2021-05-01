import type { LogOut } from 'ports/auth';
import { encase } from 'react-jpex';
import { useEffect } from 'react';
import type { Navigate } from 'ports/navigation';
import { LOGIN } from 'ui/constants/paths';
import { useTokens } from './useTokens';
import { useRefreshTokens } from './useRefreshTokens';

export const useAuth = encase(
  (logOut: LogOut, navigate: Navigate, console: Console) => () => {
    const { data: tokens } = useTokens();

    const { action } = useRefreshTokens();

    useEffect(() => {
      if (tokens.refreshToken != null && tokens.authToken == null) {
        action().catch(async (e) => {
          console.error(e);
          await logOut();
          await navigate(LOGIN);
        });
      }
    }, [action, tokens.authToken, tokens.refreshToken]);

    return tokens.refreshToken == null || tokens.authToken != null;
  },
);
