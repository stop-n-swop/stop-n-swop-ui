import jpex from 'jpex';
import type {
  SearchGamesRequest,
  SearchGamesResponse,
} from '@sns/contracts/product';
import type { SearchGames } from 'core/games';
import type { Driver } from 'core/io';

const searchGames = (driver: Driver): SearchGames => async ({
  page,
  platforms,
  search,
}) => {
  if (!search && !platforms.length) {
    return {
      games: null,
      nextPage: -1,
      counts: {
        total: 0,
        platforms: {},
      },
    };
  }

  const { data } = await driver<SearchGamesRequest, SearchGamesResponse>({
    url: '/games',
    data: {
      page,
      q: search,
      platforms,
    },
  });

  return data;
};

jpex.factory<SearchGames>(searchGames);
