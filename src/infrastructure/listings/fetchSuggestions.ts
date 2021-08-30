import jpex from 'jpex';
import type { FetchSuggestions } from 'core/listings';
import type { SearchListingsResponse } from '@sns/contracts/listing';
import type { AuthDriver } from 'core/io';

jpex.factory<FetchSuggestions>(
  (driver: AuthDriver): FetchSuggestions =>
    async () => {
      const {
        data: { listings },
      } = await driver<void, SearchListingsResponse>({
        url: '/listings/suggested',
      });

      return listings;
    },
);
