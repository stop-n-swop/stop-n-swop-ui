export interface Address {
  line1: string;
  line2: string;
  city: string;
  postcode: string;
  country: string;
}

export interface User {
  email: string;
  username: string;
  name: string;
  phoneNumber: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    postcode: string;
    country: string;
  };
  preferences: Record<string, unknown>;
  verified: boolean;
}
