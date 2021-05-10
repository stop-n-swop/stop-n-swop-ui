import { useAction } from '@respite/action';
import type { UpdateUser } from 'core/user';
import { encase } from 'react-jpex';
import { UpdateUserKey } from 'application/keys';

export const useUpdateUser = encase((update: UpdateUser) => () => {
  return useAction(UpdateUserKey, update, []);
});
