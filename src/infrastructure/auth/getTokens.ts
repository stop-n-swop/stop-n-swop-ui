import jpex from 'jpex';
import type { GetTokens } from 'core/auth';
import type { Persist, Temp } from 'core/io';

const getTokens = (persist: Persist, temp: Temp): GetTokens => async () => {
  const authToken = await temp.get<string>('authToken');
  const refreshToken = await persist.get<string>('refreshToken');

  return { authToken, refreshToken };
};

jpex.factory<GetTokens>(getTokens);
