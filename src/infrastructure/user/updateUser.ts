import jpex from 'jpex';
import type {
  UpdateUserRequest,
  UpdateUserResponse,
} from '@sns/contracts/user';
import type { AuthDriver } from 'core/io';
import type { ClearUser, UpdateUser } from 'core/user';

const updateUser =
  (driver: AuthDriver, clearUser: ClearUser): UpdateUser =>
  async (args) => {
    const response = await driver<UpdateUserRequest, UpdateUserResponse>({
      url: '/users/my',
      method: 'PATCH',
      data: args,
    });

    await clearUser();

    return response.data;
  };

jpex.factory<UpdateUser>(updateUser);
