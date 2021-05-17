import jpex from 'jpex';
import type { LogIn } from 'core/auth';
import type { Driver } from 'core/io';
import type { LoginRequest, LoginResponse } from '@sns/contracts/user';

const logIn = (driver: Driver): LogIn => async ({ provider, token }) => {
  const response = await driver<LoginRequest, LoginResponse>({
    url: '/auth/sessions',
    method: 'POST',
    data: { provider, token },
  });

  const {
    data: { authToken, refreshToken, userId },
  } = response;

  return { authToken, refreshToken, userId };
};

jpex.factory<LogIn>(logIn);
