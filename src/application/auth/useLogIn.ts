import type { LogIn, SaveTokens } from 'core/auth';
import { useAction } from '@respite/action';
import { encase } from 'react-jpex';
import { LogInKey } from 'application/keys';
import type { OauthProvider } from '@sns/contracts/user';

export const useLogIn = encase((logIn: LogIn, saveTokens: SaveTokens) => () => {
  return useAction(
    LogInKey,
    async ({ provider, token }: { provider: OauthProvider; token: string }) => {
      const { authToken, refreshToken } = await logIn({ provider, token });
      await saveTokens({ authToken, refreshToken });
    },
    [],
  );
});
