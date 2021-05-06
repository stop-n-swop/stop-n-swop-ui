import type { Platform } from '@sns/contracts/product';
import jpex from 'jpex';
import type { Driver } from 'ports/io';
import type { FetchPlatforms } from 'ports/platforms';

const fetchPlatforms = (driver: Driver): FetchPlatforms => async () => {
  const { data } = await driver<void, Platform[]>({
    url: '/api/platforms',
  });

  return data;
};

jpex.factory<FetchPlatforms>(fetchPlatforms);
