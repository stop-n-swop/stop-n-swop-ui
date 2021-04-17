import type { Type } from "./enums";

export interface Manufacturer {
  id: string;
  name: string;
}

export interface ShortProduct {
  productId: string;
  name: string;
}

export interface Product extends ShortProduct {
  type: Type;
  cover: string;
  banner: string;
  releaseDate: Date;
}

export interface Game extends Product {
  type: Type.GAME;
  platformId: string;
  developer: string;
  publisher: string;
}

export interface Platform extends Product {
  type: Type.PLATFORM;
}
