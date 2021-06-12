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
export type GetOrderRequest = void;
export type GetOrderResponse = Order;

export interface CreateOrderRequest {
  listingId: string;
}
export interface CreateOrderResponse {
  id: string;
}

export interface PatchOrderParams {
  orderId: string;
}
export type PatchOrderRequest = Pick<Order, "status">;
export interface PatchOrderResponse {}
