import jpex from 'jpex';
import type { LogIn } from 'ports/auth';
import type { Driver } from 'ports/io';
import type { LoginRequest, LoginResponse } from '@sns/contracts/user';

const logIn = (driver: Driver): LogIn => async ({ password, email }) => {
  const response = await driver<LoginRequest, LoginResponse>({
    url: '/api/auth/sessions',
    method: 'POST',
    data: { password, email },
  });

  const {
    data: { authToken, refreshToken, userId },
  } = response;

  return { authToken, refreshToken, userId };
};

jpex.factory<LogIn>(logIn);
