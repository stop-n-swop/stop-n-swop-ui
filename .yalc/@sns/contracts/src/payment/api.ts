import { Address } from "../user";
import { Card, Transaction } from "./entities";

export interface SaveBankDetailsRequest {
  name: string;
  address: Address;
  sortCode: string;
  accountNumber: string;
}
export type SaveBankDetailsResponse = {};

export type CreateCardRequest = void;
export interface CreateCardResponse {
  id: string;
  accessKey: string;
  preregistrationData: string;
  cardRegistrationUrl: string;
}

export interface PlaceOrderParams {
  orderId: string;
}
export interface PlaceOrderRequest {
  cardId: string;
  secureModeReturnUrl: string;
  remember: boolean;
}
export type PlaceOrderResponse = {
  secureMode: boolean;
  secureModeUrl: string;
};

export interface GetCardsResponse {
  cards: Array<Card>;
}

export interface GetTransactionsResponse {
  transactions: Transaction[];
}

export interface GetBalanceResponse {
  balance: number;
  currency: string;
}

export interface WithdrawBalanceRequest {
  amount: number;
}
