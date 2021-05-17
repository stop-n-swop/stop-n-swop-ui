import type {
  UpdateUserRequest,
  UpdateUserResponse,
} from '@sns/contracts/user';
import jpex from 'jpex';
import type { AuthDriver } from 'core/io';
import type { UpdateUser } from 'core/user';

const updateUser = (driver: AuthDriver): UpdateUser => async (args) => {
  const response = await driver<UpdateUserRequest, UpdateUserResponse>({
    url: '/users/my',
    method: 'PATCH',
    data: args,
  });

  return response.data;
};

jpex.factory<UpdateUser>(updateUser);
