import { Basket } from "./entities";
export declare type FetchBasketRequest = void;
export declare type FetchBasketResponse = Basket;
export interface AddToBasketRequest {
    listingId: string;
}
export declare type AddToBasketResponse = void;
