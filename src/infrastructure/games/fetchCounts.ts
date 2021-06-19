import jpex from 'jpex';
import type {
  GetSearchCountsRequest,
  GetSearchCountsResponse,
} from '@sns/contracts/product';
import type { FetchCounts } from 'core/games';
import type { Driver } from 'core/io';

const fetchCounts =
  (driver: Driver): FetchCounts =>
  async ({ platforms, search, available }) => {
    if (!platforms.length && !search) {
      return {
        available: 0,
        platforms: {},
        total: 0,
      };
    }

    const { data } = await driver<
      GetSearchCountsRequest,
      GetSearchCountsResponse
    >({
      url: '/games/counts',
      data: {
        q: search,
        platformIds: platforms,
        available,
      },
    });

    return data;
  };

jpex.factory<FetchCounts>(fetchCounts);
