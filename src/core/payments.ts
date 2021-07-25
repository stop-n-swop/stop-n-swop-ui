import type {
  Card,
  SaveBankDetailsRequest,
  Transaction,
} from '@sns/contracts/payment';

export type SaveBankDetails = (args: SaveBankDetailsRequest) => Promise<void>;

export type UploadDocument = (args: { files: File[] }) => Promise<void>;

export type CreateCard = () => Promise<{
  id: string;
  cardRegistrationUrl: string;
  accessKey: string;
  preregistrationData: string;
}>;

export type CompleteCard = (args: {
  cardRegistrationUrl: string;
  preregistrationData: string;
  accessKey: string;
  id: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}) => Promise<{ cardId: string }>;

export type FetchCards = () => Promise<Card[]>;

export type FetchTransactions = () => Promise<Transaction[]>;

export type FetchBalance = () => Promise<{ balance: number; currency: string }>;

export type WithdrawBalance = (args: { amount: number }) => Promise<void>;
