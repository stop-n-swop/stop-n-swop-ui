import jpex from 'jpex';
import type {
  UpdateListingRequest,
  UpdateListingResponse,
} from '@sns/contracts/listing';
import type { AuthDriver } from 'core/io';
import type { UpdateListing } from 'core/listings';

const updateListing =
  (driver: AuthDriver): UpdateListing =>
  async ({ id, ...data }) => {
    const { data: listing } = await driver<
      UpdateListingRequest,
      UpdateListingResponse
    >({
      url: '/listings/{id}',
      params: { id },
      method: 'PUT',
      data,
    });

    return listing;
  };

jpex.factory<UpdateListing>(updateListing);
