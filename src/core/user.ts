import type { User, UpdateUserRequest } from '@sns/contracts/user';

export type GetUser = (args?: { username?: string }) => Promise<User>;

export type UpdateUser = (args: UpdateUserRequest) => Promise<void>;
