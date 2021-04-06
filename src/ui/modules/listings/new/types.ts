import { Condition, Region } from '@sns/contracts/listing';
import { ImageUrl } from 'core/types';

export interface Values {
  condition: Condition;
  description: string;
  boxed: boolean;
  instructions: boolean;
  images: ImageUrl[];
  price: number;
  region: Region;
}
