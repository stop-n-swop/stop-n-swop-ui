import type { Platform } from '@sns/contracts/product';

export type FetchPlatforms = () => Promise<Platform[]>;
