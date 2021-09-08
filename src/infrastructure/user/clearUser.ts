import jpex from 'jpex';
import type { ClearUser } from 'core/user';
import type { Persist } from 'core/io';

jpex.factory<ClearUser>((persist: Persist) => async () => {
  await persist.delete('user');
});
