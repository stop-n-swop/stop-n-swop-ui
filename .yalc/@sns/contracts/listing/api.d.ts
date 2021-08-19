import { Status } from "../order";
import { AuditItem, Listing } from "./entities";
import { Condition, Region } from "./enums";
import { Address } from "../user";
export declare type GetListingRequirementsRequest = void;
export interface GetListingRequirementsResponse {
    photos: Array<{
        key: string;
        required: boolean;
    }>;
}
export declare type CreateListingRequest = Omit<UpdateListingRequest, "id">;
export interface CreateListingResponse {
    id: string;
}
export interface UpdateListingParams {
    listingId: string;
}
export declare type UpdateListingRequest = Omit<Listing, "createdDate" | "username" | "location" | "rating" | "status" | "id">;
export declare type UpdateListingResponse = Listing;
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
}
export interface SearchListingsResponse {
    listings: Listing[];
}
export interface GetListingParams {
    listingId: string;
}
export declare type GetListingRequest = void;
export declare type GetListingResponse = Listing;
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
export declare type GetHistoryRequest = void;
export interface GetHistoryResponse {
    history: AuditItem[];
}
export interface ChangeListingStatusParams {
    listingId: string;
}
export interface ChangeListingStatusRequest {
    status: Status;
}
export interface ChangeListingStatusResponse {
}
export interface GetListingAddressParams {
    listingId: string;
}
export interface GetListingAddressResponse {
    name: string;
    address: Address;
}
