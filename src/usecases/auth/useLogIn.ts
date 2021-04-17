import type { LogIn, SaveTokens } from 'ports/auth';
import { useAction } from '@respite/action';
import { encase } from 'react-jpex';
import { useCallback } from 'react';
import { LogInKey } from 'usecases/keys';

export const useLogIn = encase((logIn: LogIn, saveTokens: SaveTokens) => () => {
  const fn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const { authToken, refreshToken } = await logIn({ email, password });
      await saveTokens({ authToken, refreshToken });
    },
    [],
  );
  return useAction(LogInKey, fn);
});
