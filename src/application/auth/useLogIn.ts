import { useAction } from '@respite/action';
import { encase } from 'react-jpex';
import { LogInKey } from 'application/keys';
import type { LogIn, SaveTokens } from 'core/auth';
import type { OauthProvider } from '@sns/contracts/user';
import type { Emit } from 'core/events';

export const useLogIn = encase(
  (logIn: LogIn, saveTokens: SaveTokens, emit: Emit) => () => {
    return useAction(
      LogInKey,
      async ({
        provider,
        token,
      }: {
        provider: OauthProvider;
        token: string;
      }) => {
        const { authToken, refreshToken } = await logIn({ provider, token });
        await saveTokens({ authToken, refreshToken });
        emit('logged_in', {});
      },
      [],
    );
  },
);
