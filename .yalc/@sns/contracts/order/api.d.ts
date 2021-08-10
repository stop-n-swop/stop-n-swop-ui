import { AuditItem } from "../listing";
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
export interface UpdateOrderStatusParams {
    orderId: string;
}
export declare type UpdateOrderStatusRequest = Pick<Order, "status">;
export declare type UpdateOrderStatusResponse = Order;
export interface GetHistoryParams {
    orderId: string;
}
export declare type GetHistoryRequest = void;
export interface GetHistoryResponse {
    history: AuditItem[];
}
