import { Listing, Stats } from "./entities";

export type GetListingRequirementsRequest = void;

export interface GetListingRequirementsResponse {
  photos: Array<{
    key: string;
    required: boolean;
  }>;
}

export type CreateListingRequest = Omit<
  Listing,
  "id" | "createdDate" | "username" | "location" | "rating"
>;

export interface CreateListingResponse {
  id: string;
}
