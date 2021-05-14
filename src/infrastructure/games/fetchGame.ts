import type { GetGameRequest, GetGameResponse } from '@sns/contracts/product';
import jpex from 'jpex';
import type { FetchGame } from 'core/games';
import type { Driver } from 'core/io';

const fetchGame = (driver: Driver): FetchGame => async ({ id }) => {
  const { data } = await driver<GetGameRequest, GetGameResponse>({
    url: '/api/games/{id}',
    params: { id },
  });

  return data;
};

jpex.factory<FetchGame>(fetchGame);
