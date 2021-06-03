import base from 'jpex';
import { LOGIN } from 'ui/constants/paths';
import { Reason } from 'domain/constants/auth';
import { NotAuthenticatedError, UnknownError } from '@sns/abyss';
import type { AuthDriver, Driver } from 'core/io';
import type {
  GetTokens,
  ClearTokens,
  RefreshTokens,
  SaveTokens,
} from 'core/auth';
import type { Navigate } from 'core/navigation';
import '../authDriver';

const setup = () => {
  const jpex = base.extend();
  const driver = jest
    .fn()
    .mockResolvedValue({ status: 200, data: { foo: 'bar' } });
  const getTokens = jest.fn().mockResolvedValue({
    authToken: 'auth-token',
    refreshToken: 'refresh-token',
  });
  const navigate = jest.fn();
  const refreshTokens = jest
    .fn()
    .mockResolvedValue({ authToken: 'new-auth', refreshToken: 'new-refresh' });
  const saveTokens = jest.fn().mockResolvedValue({});
  const clearTokens = jest.fn().mockResolvedValue({});

  jpex.constant<Driver>(driver);
  jpex.constant<GetTokens>(getTokens);
  jpex.constant<Navigate>(navigate);
  jpex.constant<RefreshTokens>(refreshTokens);
  jpex.constant<SaveTokens>(saveTokens);
  jpex.constant<ClearTokens>(clearTokens);

  const authDriver = jpex.resolve<AuthDriver>();

  return {
    getTokens,
    driver,
    authDriver,
    navigate,
    refreshTokens,
    saveTokens,
    clearTokens,
  };
};

describe('when not logged in', () => {
  it('redirects to the login page', async () => {
    const { authDriver, navigate, getTokens } = setup();
    getTokens.mockResolvedValue({ authToken: null, refreshToken: null });

    authDriver({ url: '/api' });
    await new Promise((res) => setTimeout(res, 10));

    expect(navigate).toBeCalledWith(`${LOGIN}?reason=${Reason.LOGIN_REQUIRED}`);
  });
});

describe('when logged in', () => {
  it('adds an authorization header to the request', async () => {
    const { authDriver, driver } = setup();

    await authDriver({ url: '/api', headers: { 'x-secret': 'shh' } });

    expect(driver).toBeCalledWith({
      url: '/api',
      headers: { authorization: 'Bearer auth-token', 'x-secret': 'shh' },
    });
  });
  it('returns the response', async () => {
    const { authDriver } = setup();

    const response = await authDriver({ url: '/api' });

    expect(response).toEqual({ status: 200, data: { foo: 'bar' } });
  });

  describe('when response errors', () => {
    describe('when error is a 500', () => {
      it('rethrows the error', async () => {
        const { authDriver, driver } = setup();
        driver.mockRejectedValue(new UnknownError());

        const promise = authDriver({ url: '/api' });

        await expect(promise).rejects.toThrow(new UnknownError());
      });
    });
    describe('when error is a 401', () => {
      it('refreshes the auth tokens', async () => {
        const { authDriver, driver, refreshTokens, saveTokens } = setup();
        driver.mockRejectedValueOnce(new NotAuthenticatedError());

        await authDriver({ url: '/api' });

        expect(refreshTokens).toBeCalled();
        expect(saveTokens).toBeCalledWith({
          authToken: 'new-auth',
          refreshToken: 'new-refresh',
        });
      });
      describe('when refreshing the auth tokens fails', () => {
        it('redirects to the login page', async () => {
          const { authDriver, driver, refreshTokens, navigate, clearTokens } =
            setup();
          driver.mockRejectedValueOnce(new NotAuthenticatedError());
          refreshTokens.mockRejectedValue(new Error('failed to refresh'));

          authDriver({ url: '/api' });
          await new Promise((res) => setTimeout(res, 10));

          expect(refreshTokens).toBeCalled();
          expect(clearTokens).toBeCalled();
          expect(navigate).toBeCalledWith(
            `${LOGIN}?reason=${Reason.SESSION_EXPRED}`,
          );
        });
      });
      it('attempts to fetch again', async () => {
        const { authDriver, driver } = setup();
        driver.mockRejectedValueOnce(new NotAuthenticatedError());

        await authDriver({ url: '/api' });

        expect(driver).toBeCalledTimes(2);
      });
      describe('when re-fetch succeeds', () => {
        it('returns the result', async () => {
          const { authDriver, driver } = setup();
          driver.mockRejectedValueOnce(new NotAuthenticatedError());

          const response = await authDriver({ url: '/api' });

          expect(response).toEqual({ status: 200, data: { foo: 'bar' } });
        });
      });
      describe('when re-fetch fails', () => {
        it('signs out and redirects to login', async () => {
          const { authDriver, driver, refreshTokens, clearTokens, navigate } =
            setup();
          driver.mockRejectedValue(new NotAuthenticatedError());

          authDriver({ url: '/api' });
          await new Promise((res) => setTimeout(res, 10));

          expect(refreshTokens).toBeCalled();
          expect(clearTokens).toBeCalled();
          expect(navigate).toBeCalledWith(
            `${LOGIN}?reason=${Reason.SESSION_EXPRED}`,
          );
        });
      });
    });
  });
});
