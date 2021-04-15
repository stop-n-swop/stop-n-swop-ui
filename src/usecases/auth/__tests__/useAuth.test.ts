import { renderHook, act } from '@testing-library/react-hooks';
import type { LogOut, GetTokens, RefreshTokens, SaveTokens } from 'ports/auth';
import type { Navigate } from 'ports/navigation';
import { LOGIN } from 'ui/constants/paths';
import createWrapper from '__tests__/createWrapper';
import { useAuth } from '../useAuth';

const setup = ({
  authToken = 'auth-token',
  refreshToken = 'refresh-token',
}: {
  authToken?: string;
  refreshToken?: string;
} = {}) => {
  const refreshTokens = jest
    .fn()
    .mockResolvedValue({ authToken: 'new-auth', refreshToken: 'new-refresh' });
  const saveTokens = jest.fn();
  const getTokens = jest.fn().mockResolvedValue({ authToken, refreshToken });
  const logOut = jest.fn();
  const navigate = jest.fn();

  const wrapper = createWrapper({
    inject(jpex) {
      jpex.constant<RefreshTokens>(refreshTokens);
      jpex.constant<SaveTokens>(saveTokens);
      jpex.constant<GetTokens>(getTokens);
      jpex.constant<LogOut>(logOut);
      jpex.constant<Navigate>(navigate);
      jpex.constant<Console>({
        ...console,
        error: jest.fn(),
      });
    },
  });

  const render = async () => {
    const ctx = renderHook(() => useAuth(), { wrapper });
    await act(() => new Promise((res) => setTimeout(res, 50)));
    if (ctx.result.error) {
      throw ctx.result.error;
    }
    return ctx;
  };

  return {
    refreshTokens,
    saveTokens,
    getTokens,
    logOut,
    navigate,
    render,
  };
};

describe('when there is no auth token', () => {
  it('refreshes the auth tokens', async () => {
    const { render, refreshTokens } = setup({ authToken: null });

    await render();

    expect(refreshTokens).toBeCalled();
  });
  describe('when refreshing the auth tokens fails', () => {
    it('clears the tokens', async () => {
      const { render, refreshTokens, logOut } = setup({
        authToken: null,
      });
      refreshTokens.mockRejectedValue(new Error('failed to refresh tokens'));

      await render();

      expect(logOut).toBeCalled();
    });
    it('redirects to the login page', async () => {
      const { render, refreshTokens, navigate } = setup({ authToken: null });
      refreshTokens.mockRejectedValue(new Error('failed to refresh tokens'));

      await render();

      expect(navigate).toBeCalledWith(LOGIN);
    });
  });
});

describe('when there is no refresh token', () => {
  it('does nothing', async () => {
    const { render, refreshTokens, navigate } = setup({
      refreshToken: null,
      authToken: null,
    });

    await render();

    expect(refreshTokens).not.toBeCalled();
    expect(navigate).not.toBeCalled();
  });
});

describe('when there is an auth token and refresh token', () => {
  it('does nothing', async () => {
    const { render, refreshTokens, navigate } = setup();

    await render();

    expect(refreshTokens).not.toBeCalled();
    expect(navigate).not.toBeCalled();
  });
});
