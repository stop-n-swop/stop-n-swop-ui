import { Reason } from 'domain/constants/auth';
import jpex from 'jpex';
import { makeLoginPath } from 'ui/constants/paths';
import { NotAuthenticatedError } from '@sns/abyss';
import type {
  ClearTokens,
  GetTokens,
  RefreshTokens,
  SaveTokens,
} from 'core/auth';
import type { AuthDriver, Driver } from 'core/io';
import type { Navigate } from 'core/navigation';
import type { Emit } from 'core/events';

const authDriver = (
  driver: Driver,
  getTokens: GetTokens,
  refreshTokens: RefreshTokens,
  saveTokens: SaveTokens,
  clearTokens: ClearTokens,
  navigate: Navigate,
  emit: Emit,
): AuthDriver =>
  async function authDriver(args, tries = 1) {
    const { headers, ...rest } = args;
    const { authToken } = await getTokens();

    try {
      return await driver({
        ...rest,
        headers: {
          ...headers,
          authorization: `Bearer ${authToken}`,
        },
      });
    } catch (e) {
      if (!(e instanceof NotAuthenticatedError)) {
        throw e;
      }
      // we don't want to end up going round and round forever
      // if refreshing the tokens isn't enough then we should just bail out
      if (tries <= 2) {
        try {
          const newTokens = await refreshTokens();
          await saveTokens(newTokens);
          return authDriver(args, tries + 1);
        } catch {
          // failed to refresh tokens, fall through to just logging out
        }
      }
    }

    await clearTokens();
    emit('session_expired', {});
    return navigate(makeLoginPath({ reason: Reason.SESSION_EXPRED }));
  };

jpex.factory<AuthDriver>(authDriver);
