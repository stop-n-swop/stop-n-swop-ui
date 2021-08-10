import type { OauthProvider } from "./enums";
import type { User } from "./entities";

export interface RefreshTokenRequest {
  token: string;
}
export interface RefreshTokenResponse {
  authToken: string;
  refreshToken: string;
  userId: string;
}

export interface LoginRequest {
  provider: OauthProvider;
  token: string;
}
export type LoginResponse = RefreshTokenResponse;

export interface UpdateUserRequest extends Pick<Partial<User>, "username"> {
  address?: Partial<User["address"]>;
  clientEmail?: string;
}

export type UpdateUserResponse = void;
