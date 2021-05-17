import type {
  CreateListingRequest,
  CreateListingResponse,
} from '@sns/contracts/listing';
import type { AuthDriver } from 'core/io';
import type { CreateListing } from 'core/listings';
import jpex from 'jpex';

const createListing = (driver: AuthDriver): CreateListing => async (args) => {
  const response = await driver<CreateListingRequest, CreateListingResponse>({
    url: '/listings',
    method: 'POST',
    data: args,
  });

  return { id: response.data.id };
};

jpex.factory<CreateListing>(createListing);
