export interface Address {
  line1: string;
  line2: string;
  city: string;
  postcode: string;
  country: string;
}

export interface User {
  email: string;
  clientEmail: string;
  username: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    postcode: string;
    country: string;
    location: string;
  };
  created: Date;
  preferences: {
    manualApproval: boolean;
    noticeEmails: boolean;
  };
  verified: boolean;
}
