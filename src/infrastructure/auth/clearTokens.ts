import jpex from 'jpex';
import type { ClearTokens } from 'core/auth';
import type { Persist, Temp } from 'core/io';
import type { ClearUser } from 'core/user';

const clearTokens =
  (persist: Persist, temp: Temp, clearUser: ClearUser): ClearTokens =>
  async () => {
    await temp.delete('authToken');
    await persist.delete('refreshToken');
    await clearUser();
  };

jpex.factory<ClearTokens>(clearTokens);
