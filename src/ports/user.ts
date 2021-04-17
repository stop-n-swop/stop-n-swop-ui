export type CreateUser = (args: {
  email: string;
  password: string;
}) => Promise<void>;
