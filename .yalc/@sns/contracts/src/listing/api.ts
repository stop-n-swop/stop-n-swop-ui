import { Status } from "../order";
import { AuditItem, Listing, Discount } from "./entities";
import { Condition, Region } from "./enums";
import { Address } from "../user";

export type GetListingRequirementsRequest = void;

export interface GetListingRequirementsResponse {
  photos: Array<{
    key: string;
    required: boolean;
  }>;
}

export type CreateListingRequest = Omit<UpdateListingRequest, "id">;

export interface CreateListingResponse {
  id: string;
}

export interface UpdateListingParams {
  listingId: string;
}
export type UpdateListingRequest = Omit<
  Listing,
  | "createdDate"
  | "username"
  | "location"
  | "rating"
  | "status"
  | "id"
  | "discount"
>;
export type UpdateListingResponse = Listing;

export interface SearchListingsRequest {
  productId?: string;
  boxed?: boolean;
  instructions?: boolean;
  condition?: Condition | Condition[];
  region?: Region | Region[];
  rating?: number;
  minPrice?: number;
  maxPrice?: number;
  status?: Status;
  username?: string;
  sortBy?: string;
  limit?: number;
  ids?: string[];
}
export interface SearchListingsResponse {
  listings: Listing[];
}

export interface GetListingParams {
  listingId: string;
}
export type GetListingRequest = void;
export type GetListingResponse = Listing;

export interface GetProductsListingCountRequest {
  productIds?: string[];
  gameIds?: string[];
}
export interface GetProductsListingCountResponse {
  counts: Array<{
    productId: string;
    count: number;
  }>;
}

export interface GetCompletedListingCountParams {
  userId: string;
}
export interface GetCompletedListingCountResponse {
  count: number;
}

export interface GetHistoryParams {
  listingId: string;
}
export type GetHistoryRequest = void;
export interface GetHistoryResponse {
  history: AuditItem[];
}

export interface ChangeListingStatusParams {
  listingId: string;
}
export interface ChangeListingStatusRequest {
  status: Status;
}
export interface ChangeListingStatusResponse {}

export interface GetListingAddressParams {
  listingId: string;
}
export interface GetListingAddressResponse {
  name: string;
  address: Address;
}

export type GetDiscountParams = {
  productId: string;
};
export type GetDiscountBody = void;
export type GetDiscountResponse = Discount;
