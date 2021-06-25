import type { AuditItem } from '@sns/contracts/listing';
import type { Order, PatchOrderRequest, Status } from '@sns/contracts/order';

export type FetchMyOrders = () => Promise<Order[]>;

export type FetchListingOrders = (args: {
  listingId: string;
}) => Promise<Order[]>;

export type CreateOrder = (args: {
  listingId: string;
}) => Promise<{ orderId: string }>;

export type ChangeStatus = (args: {
  orderId: string;
  status: Status;
}) => Promise<void>;

export type PatchOrder = (
  args: PatchOrderRequest & { orderId: string },
) => Promise<void>;

export type FetchHistory = (args: { orderId: string }) => Promise<AuditItem[]>;
