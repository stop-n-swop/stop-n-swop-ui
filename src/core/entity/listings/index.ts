import { Condition, Region } from 'core/constants/listings';
import { ImageUrl } from 'core/types';

export interface Stats {
  condition: Condition;
  region: Region;
  boxed: boolean;
  instructions: boolean;
}

export interface Listing {
  productId: string;
  listingId: string;
  images: ImageUrl[];
  price: number;
  rating: number;
  location: string;
  stats: Stats;
  description: string;
  username: string;
}
