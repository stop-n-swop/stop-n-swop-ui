import { useAction } from '@respite/action';
import type { CreateUser } from 'ports/user';
import { useCallback } from 'react';
import { encase } from 'react-jpex';
import { useLogIn } from 'usecases/auth';
import { RegisterKey } from 'usecases/keys';

export const useRegister = encase((createUser: CreateUser) => () => {
  const { action: logIn } = useLogIn();

  const fn = useCallback(
    async ({ password, email }: { password: string; email: string }) => {
      await createUser({ email, password });
      await logIn({ email, password });
    },
    [logIn],
  );

  return useAction(RegisterKey, fn);
});
