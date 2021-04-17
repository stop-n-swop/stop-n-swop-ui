export interface RefreshTokenRequest {
  token: string;
}
export interface RefreshTokenResponse {
  authToken: string;
  refreshToken: string;
  userId: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export type LoginResponse = RefreshTokenResponse;

export interface CreateUserRequest {
  email: string;
  password: string;
}
export type CreateUserResponse = void;
