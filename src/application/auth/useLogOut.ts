import { useAction } from '@respite/action';
import { encase } from 'react-jpex';
import { LogOutKey } from 'application/keys';
import type { LogOut } from 'core/auth';
import type { Emit } from 'core/events';

export const useLogOut = encase((logOut: LogOut, emit: Emit) => () => {
  return useAction(
    LogOutKey,
    async () => {
      await logOut();
      emit('logged_out', {});
    },
    [],
  );
});
