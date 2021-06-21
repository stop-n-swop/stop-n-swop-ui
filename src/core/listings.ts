import type {
  CreateListingRequest,
  SearchListingsRequest,
  Listing,
  AuditItem,
  UpdateListingRequest,
} from '@sns/contracts/listing';
import type { Status } from '@sns/contracts/order';
import type { Address } from '@sns/contracts/user';

export type FetchListingRequirements = (args: {
  productId: string;
  platformId: string;
}) => Promise<{
  images: Array<{ key: string; required: boolean }>;
}>;

export type CreateListing = (
  args: CreateListingRequest,
) => Promise<{ id: string }>;

export type UpdateListing = (
  args: UpdateListingRequest & { id: string },
) => Promise<Listing>;

export type ChangeListingStatus = (args: {
  id: string;
  status: Status;
}) => Promise<void>;

export type SearchListings = (
  args: SearchListingsRequest,
) => Promise<Listing[]>;

export type FetchListing = (args: { id: string }) => Promise<Listing>;

export type FetchProductsListingCount = (args: {
  productIds: string[];
}) => Promise<
  Array<{
    productId: string;
    count: number;
  }>
>;

export type FetchMyListings = () => Promise<Listing[]>;

export type FetchHistory = (args: {
  listingId: string;
}) => Promise<AuditItem[]>;

export type FetchAddress = (args: {
  listingId: string;
}) => Promise<{ name: string; address: Address }>;
