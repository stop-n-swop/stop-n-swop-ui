export interface User {
  email: string;
  username: string;
  name: string;
  phoneNumber: string;
  address: Record<string, unknown>;
  preferences: Record<string, unknown>;
  verified: boolean;
}
