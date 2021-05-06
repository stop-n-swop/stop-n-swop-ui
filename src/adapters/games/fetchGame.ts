import type { Game } from '@sns/contracts/product';
import jpex from 'jpex';
import type { FetchGame } from 'ports/games';
import type { Driver } from 'ports/io';

const fetchGame = (driver: Driver): FetchGame => async ({ id }) => {
  const { data } = await driver<void, Game>({
    url: '/api/games/{id}',
    params: { id },
  });

  return data;
};

jpex.factory<FetchGame>(fetchGame);
