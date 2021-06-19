import jpex from 'jpex';
import type {
  SearchGamesRequest,
  SearchGamesResponse,
} from '@sns/contracts/product';
import type { SearchGames } from 'core/games';
import type { Driver } from 'core/io';

const searchGames =
  (driver: Driver): SearchGames =>
  async ({ page, platforms, search, available }) => {
    const { data } = await driver<SearchGamesRequest, SearchGamesResponse>({
      url: '/games',
      data: {
        page,
        q: search,
        platformIds: platforms,
        available,
      },
    });

    return data;
  };

jpex.factory<SearchGames>(searchGames);
