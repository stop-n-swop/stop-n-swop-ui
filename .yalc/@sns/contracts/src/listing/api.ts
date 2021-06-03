import { AuditItem, Listing } from "./entities";
import { Condition, Region } from "./enums";

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
  "createdDate" | "username" | "location" | "rating" | "status" | "id"
>;
export type UpdateListingResponse = Listing;

export interface SearchListingsRequest {
  productId?: string;
  platformId?: string;
  boxed?: boolean;
  instructions?: boolean;
  condition?: Condition | Condition[];
  region?: Region | Region[];
  rating?: number;
  minPrice?: number;
  maxPrice?: number;
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
  products: Array<{
    productId: string;
    platformId: string;
  }>;
}
export interface GetProductsListingCountResponse {
  counts: Array<{
    productId: string;
    platformId: string;
    count: number;
  }>;
}

export interface GetHistoryParams {
  listingId: string;
}
export type GetHistoryRequest = void;
export interface GetHistoryResponse {
  history: AuditItem[];
}
