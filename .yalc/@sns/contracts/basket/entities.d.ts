import { Status } from "./enums";
export interface Basket {
    id: string;
    items: BasketItem[];
    status: Status;
}
export interface BasketItem {
    id: string;
    listingId: string;
}
