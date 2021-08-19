import { encase } from 'react-jpex';
import { useEffect } from 'react';
import { LOGIN } from 'ui/constants/paths';
import type { Navigate } from 'core/navigation';
import type { LogOut } from 'core/auth';
import { useTokens } from './useTokens';
import { useRefreshTokens } from './useRefreshTokens';
import type { Emit } from 'core/events';

export const useAuth = encase(
  (logOut: LogOut, navigate: Navigate, console: Console, emit: Emit) => () => {
    const { data: tokens } = useTokens();

    const { action } = useRefreshTokens();

    useEffect(() => {
      if (tokens.refreshToken != null && tokens.authToken == null) {
        action().catch(async (e) => {
          console.error(e);
          await logOut();
          emit('session_expired', {});
          await navigate(LOGIN);
        });
      }
    }, [action, tokens.authToken, tokens.refreshToken]);

    return tokens.refreshToken == null || tokens.authToken != null;
  },
);
