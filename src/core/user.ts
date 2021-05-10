import type { User, UpdateUserRequest } from '@sns/contracts/user';

export type GetUser = () => Promise<User>;

export type UpdateUser = (args: UpdateUserRequest) => Promise<void>;
