import { useAction } from '@respite/action';
import type { LogOut } from 'ports/auth';
import { encase } from 'react-jpex';
import { LogOutKey } from 'usecases/keys';

export const useLogOut = encase((logOut: LogOut) => () => {
  return useAction(LogOutKey, logOut);
});
