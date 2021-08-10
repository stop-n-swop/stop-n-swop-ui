import { Transaction } from "./entities";

export interface StartPaymentParams {
  orderId: string;
}
export interface StartOrderBody {}
export interface StartOrderResponse {
  paymentId: string;
}

export interface PlaceOrderParams {
  orderId: string;
}
export interface PlaceOrderRequest {}
export type PlaceOrderResponse = {};

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
