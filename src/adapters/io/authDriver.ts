import { Reason } from 'domain/constants/auth';
import jpex from 'jpex';
import type {
  ClearTokens,
  GetTokens,
  RefreshTokens,
  SaveTokens,
} from 'ports/auth';
import type { AuthDriver, Driver } from 'ports/io';
import type { Navigate } from 'ports/navigation';
import { makeLoginPath } from 'ui/constants/paths';

const authDriver = (
  driver: Driver,
  getTokens: GetTokens,
  refreshTokens: RefreshTokens,
  saveTokens: SaveTokens,
  clearTokens: ClearTokens,
  navigate: Navigate,
): AuthDriver =>
  async function authDriver(args, tries = 1) {
    const { headers, ...rest } = args;
    const { authToken, refreshToken } = await getTokens();

    if (authToken == null && refreshToken == null) {
      return navigate(makeLoginPath({ reason: Reason.LOGIN_REQUIRED }));
    }

    try {
      return await driver({
        ...rest,
        headers: {
          ...headers,
          authorization: `Bearer ${authToken}`,
        },
      });
    } catch (e) {
      if (e.status !== 401) {
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
    return navigate(makeLoginPath({ reason: Reason.SESSION_EXPRED }));
  };

jpex.factory<AuthDriver>(authDriver);
