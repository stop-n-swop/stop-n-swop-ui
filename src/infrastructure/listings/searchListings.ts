import jpex from 'jpex';
import { omitNullProperties } from 'crosscutting/utils';
import { Status } from '@sns/contracts/order';
import type {
  SearchListingsRequest,
  SearchListingsResponse,
} from '@sns/contracts/listing';
import type { Driver } from 'core/io';
import type { SearchListings } from 'core/listings';

const searchListings =
  (driver: Driver): SearchListings =>
  async (data) => {
    const {
      data: { listings },
    } = await driver<SearchListingsRequest, SearchListingsResponse>({
      url: '/listings',
      data: {
        status: Status.OPEN,
        ...omitNullProperties(data),
      },
    });

    return listings;
  };

jpex.factory<SearchListings>(searchListings);
