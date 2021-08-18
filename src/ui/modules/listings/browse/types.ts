import type { Condition, Region } from '@sns/contracts/listing';

export interface Values {
  features: Array<'boxed' | 'unboxed' | 'instructions'>;
  condition: Condition[];
  region: Region[];
  priceRange: [number, number];
  rating: number;
}
