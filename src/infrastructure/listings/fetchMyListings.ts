import jpex from 'jpex';
import type { AuthDriver } from 'core/io';
import type { FetchMyListings } from 'core/listings';
import type { SearchListingsResponse } from '@sns/contracts/listing';

const fetchMyListings =
  (driver: AuthDriver): FetchMyListings =>
  async () => {
    const {
      data: { listings },
    } = await driver<void, SearchListingsResponse>({
      url: '/listings/my',
    });

    return listings;
  };

jpex.factory<FetchMyListings>(fetchMyListings);
