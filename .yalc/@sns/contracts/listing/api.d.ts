import { AuditItem, Listing } from "./entities";
import { Condition, Region } from "./enums";
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
export declare type GetListingRequest = void;
export declare type GetListingResponse = Listing;
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
export declare type GetHistoryRequest = void;
export interface GetHistoryResponse {
    history: AuditItem[];
}
