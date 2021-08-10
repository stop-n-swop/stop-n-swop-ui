import type { User } from '@sns/contracts/user';

export const hasUsername = (user: User) => {
  return Boolean(user.username);
};

export const hasAddress = (user: User) => {
  return Boolean(user.address.line1);
};

export const hasAccount = (user: User) => {
  return Boolean(user.clientEmail);
};

export const hasPayOutPermissions = (user: User) => {
  return hasAccount(user);
};
