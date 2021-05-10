import { useAction } from '@respite/action';
import type { LogOut } from 'core/auth';
import { encase } from 'react-jpex';
import { LogOutKey } from 'application/keys';

export const useLogOut = encase((logOut: LogOut) => () => {
  return useAction(LogOutKey, logOut, []);
});
