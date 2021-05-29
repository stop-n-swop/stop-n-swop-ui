import { Basket } from "./entities";

export type FetchBasketRequest = void;
export type FetchBasketResponse = Basket;

export interface AddToBasketRequest {
  listingId: string;
}
export type AddToBasketResponse = void;
