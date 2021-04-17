import jpex from 'jpex';
import type { RefreshTokens, GetTokens } from 'ports/auth';
import type { Driver } from 'ports/io';
import type {
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '@sns/contracts/user';

const refreshTokens = (
  driver: Driver,
  getTokens: GetTokens,
): RefreshTokens => async () => {
  const { refreshToken: token } = await getTokens();

  const response = await driver<RefreshTokenRequest, RefreshTokenResponse>({
    url: '/api/auth/sessions',
    method: 'PATCH',
    data: { token },
  });

  const {
    data: { authToken, refreshToken, userId },
  } = response;

  return { authToken, refreshToken, userId };
};

jpex.factory<RefreshTokens>(refreshTokens);
