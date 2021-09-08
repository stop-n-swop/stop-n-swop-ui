import jpex from 'jpex';
import type { User } from '@sns/contracts/user';
import type { AuthDriver, Persist } from 'core/io';
import type { GetUser } from 'core/user';

const getUser =
  (driver: AuthDriver, persist: Persist): GetUser =>
  async ({ username = 'my' } = {}) => {
    let user = await persist.get<User>('user');

    if (!user) {
      const response = await driver<void, User>({
        url: '/users/{username}',
        params: { username },
      });

      user = response.data;

      await persist.set('user', user);
    }

    return user;
  };

jpex.factory<GetUser>(getUser);
