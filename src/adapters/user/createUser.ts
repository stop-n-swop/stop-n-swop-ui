import type { CreateUser } from 'ports/user';
import type { Driver } from 'ports/io';
import type {
  CreateUserResponse,
  CreateUserRequest,
} from '@sns/contracts/user';
import jpex from 'jpex';

const createUser = (driver: Driver): CreateUser => async ({
  email,
  password,
}) => {
  await driver<CreateUserRequest, CreateUserResponse>({
    url: '/api/users',
    method: 'POST',
    data: {
      email,
      password,
    },
  });
};

jpex.factory<CreateUser>(createUser);
