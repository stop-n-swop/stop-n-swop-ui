export interface RefreshTokenRequest {
  token: string;
}
export interface RefreshTokenResponse {
  authToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
export type LoginResponse = RefreshTokenResponse;

export interface CreateUserRequest {
  email: string;
  password: string;
  username: string;
}
export type CreateUserResponse = void;
