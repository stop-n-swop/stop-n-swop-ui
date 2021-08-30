import jpex from 'jpex';
import type { FetchPopularGames } from 'core/games';
import type { Driver } from 'core/io';
import type {
  GetPopularGamesRequest,
  GetPopularGamesResponse,
} from '@sns/contracts/product';

jpex.factory<FetchPopularGames>(
  (driver: Driver): FetchPopularGames =>
    async () => {
      const {
        data: { games },
      } = await driver<GetPopularGamesRequest, GetPopularGamesResponse>({
        url: '/games/view',
      });

      return games;
    },
);
