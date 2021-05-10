import type { OauthProvider } from '@sns/contracts/user';

export type LogIn = (args: {
  provider: OauthProvider;
  token: string;
}) => Promise<{ authToken: string; refreshToken: string; userId: string }>;

export type LogOut = () => Promise<void>;

export type RefreshTokens = () => Promise<{
  authToken: string;
  refreshToken: string;
  userId: string;
}>;

export type SaveTokens = (args: {
  authToken: string;
  refreshToken: string;
}) => Promise<void>;

export type GetTokens = () => Promise<{
  authToken: string;
  refreshToken: string;
}>;

export type ClearTokens = () => Promise<void>;
