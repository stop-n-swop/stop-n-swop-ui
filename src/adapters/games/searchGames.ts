import jpex from 'jpex';
import type { SearchGames } from 'ports/games';
import type { Driver } from 'ports/io';

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

  const { data } = await driver<unknown, any>({
    url: '/api/games',
    data: {
      page,
      q: search,
      platforms,
    },
  });

  return data;
};

jpex.factory<SearchGames>(searchGames);
