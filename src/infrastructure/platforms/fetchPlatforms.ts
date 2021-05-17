import type { Platform } from '@sns/contracts/product';
import jpex from 'jpex';
import type { Driver } from 'core/io';
import type { FetchPlatforms } from 'core/platforms';

const fetchPlatforms = (driver: Driver): FetchPlatforms => async () => {
  const { data } = await driver<void, Platform[]>({
    url: '/platforms',
  });

  return data;
};

jpex.factory<FetchPlatforms>(fetchPlatforms);
