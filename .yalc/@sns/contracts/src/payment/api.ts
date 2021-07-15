import { Address } from "../user";

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
}
export type PlaceOrderResponse = {};
