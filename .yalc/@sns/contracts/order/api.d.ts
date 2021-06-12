import { Order } from "./entities";
export interface SearchOrdersRequest {
    listingId?: string;
    username?: string;
    active?: boolean;
}
export interface SearchOrdersResponse {
    orders: Order[];
}
export interface GetOrderParams {
    orderId: string;
}
export declare type GetOrderRequest = void;
export declare type GetOrderResponse = Order;
export interface CreateOrderRequest {
    listingId: string;
}
export interface CreateOrderResponse {
    id: string;
}
export interface PatchOrderParams {
    orderId: string;
}
export declare type PatchOrderRequest = Pick<Order, "status">;
export interface PatchOrderResponse {
}
