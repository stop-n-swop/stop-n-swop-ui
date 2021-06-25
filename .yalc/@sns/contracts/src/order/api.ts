import { AuditItem } from "../listing";
import { DeepPartial } from "../utils";
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

export interface UpdateOrderStatusParams {
  orderId: string;
}
export type UpdateOrderStatusRequest = Pick<Order, "status">;
export type UpdateOrderStatusResponse = Order;

export interface GetHistoryParams {
  orderId: string;
}
export type GetHistoryRequest = void;
export interface GetHistoryResponse {
  history: AuditItem[];
}

export interface PatchOrderParams {
  orderId: string;
}
export type PatchOrderRequest = Pick<
  DeepPartial<Order>,
  "billingAddress" | "deliveryAddress"
>;
export type PatchOrderResponse = Order;
