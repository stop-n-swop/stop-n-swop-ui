import { KycStatus, User } from '@sns/contracts/user';

export const hasUsername = (user: User) => {
  return Boolean(user.username);
};

export const hasAddress = (user: User) => {
  return Boolean(user.address.line1);
};

export const hasDetails = (user: User) => {
  return Boolean(
    user.firstName && user.lastName && user.dateOfBirth && user.nationality,
  );
};

export const isVerified = (user: User) => {
  return user.kycStatus === KycStatus.VERIFIED;
};

export const hasAccount = (user: User) => {
  return user.hasAccount;
};

export const hasPayOutPermissions = (user: User) => {
  return hasAccount(user) && isVerified(user);
};

export const isRegistered = (user: User) => user.isRegistered;
