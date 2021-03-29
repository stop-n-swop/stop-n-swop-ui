import { ImageUrl } from 'core/types';

export interface Manufacturer {
  id: string;
  name: string;
}

export interface ShortProduct {
  productId: string;
  name: string;
}

export interface Product {
  productId: string;
  platformId: string;
  type: string;
  cover: ImageUrl;
  banner: ImageUrl;
  name: string;
  developer: string;
  publisher: string;
  releaseDate: Date;
}

export type Platform = Product;
