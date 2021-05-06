export interface User {
  username: string;
  email: string;
  name: string;
  phoneNumber: string;
  address: Record<string, unknown>;
  preferences: Record<string, unknown>;
  verified: boolean;
}
