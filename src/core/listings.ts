import type {
  CreateListingRequest,
  SearchListingsRequest,
  Listing,
} from '@sns/contracts/listing';

export type FetchListingRequirements = (args: {
  productId: string;
  platformId: string;
}) => Promise<{
  images: Array<{ key: string; required: boolean }>;
}>;

export type CreateListing = (
  args: CreateListingRequest,
) => Promise<{ id: string }>;

export type SearchListings = (
  args: SearchListingsRequest,
) => Promise<Listing[]>;

export type FetchListing = (args: { id: string }) => Promise<Listing>;

export type FetchProductsListingCount = (
  args: Array<{ productId: string; platformId: string }>,
) => Promise<
  Array<{
    productId: string;
    platformId: string;
    count: number;
  }>
>;

export type FetchMyListings = () => Promise<Listing[]>;
