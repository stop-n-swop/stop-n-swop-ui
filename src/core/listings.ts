import type { CreateListingRequest } from '@sns/contracts/listing';

export type FetchListingRequirements = (args: {
  productId: string;
  platformId: string;
}) => Promise<{
  images: Array<{ key: string; required: boolean }>;
}>;

export type CreateListing = (
  args: CreateListingRequest,
) => Promise<{ id: string }>;
