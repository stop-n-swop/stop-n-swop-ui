import jpex from 'jpex';
import type { AuthDriver } from 'core/io';
import type { FetchAddress } from 'core/listings';
import type { GetListingAddressResponse } from '@sns/contracts/listing';

const fetchHistory =
  (driver: AuthDriver): FetchAddress =>
  async ({ listingId }) => {
    const { data } = await driver<null, GetListingAddressResponse>({
      url: '/listings/{listingId}/address',
      params: { listingId },
    });

    return data;
  };

jpex.factory<FetchAddress>(fetchHistory);
