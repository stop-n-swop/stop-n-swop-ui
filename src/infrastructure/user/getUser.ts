import type { User } from '@sns/contracts/user';
import jpex from 'jpex';
import type { AuthDriver } from 'core/io';
import type { GetUser } from 'core/user';

const getUser = (driver: AuthDriver): GetUser => async () => {
  const response = await driver<void, User>({
    url: '/users/my',
  });

  return response.data;
};

jpex.factory<GetUser>(getUser);
