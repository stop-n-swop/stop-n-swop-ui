import { Listing } from "./entities";
export declare type GetListingRequirementsRequest = void;
export interface GetListingRequirementsResponse {
    photos: Array<{
        key: string;
        required: boolean;
    }>;
}
export declare type CreateListingRequest = Omit<Listing, "id" | "createdDate" | "username" | "location" | "rating">;
export interface CreateListingResponse {
    id: string;
}
