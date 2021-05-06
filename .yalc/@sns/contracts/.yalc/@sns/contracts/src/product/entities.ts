import type { Type } from "./enums";

export interface Manufacturer {
  id: string;
  name: string;
}

export interface Product {
  type: Type;
  id: string;
  name: string;
  cover: string;
  banner: string;
  releaseDate: Date;
}

export interface Game extends Product {
  type: Type.GAME;
  rawgId: number;
  platforms: string[];
  developers: string[];
  publishers: string[];
}

export interface Platform extends Product {
  type: Type.PLATFORM;
  rawgId: number;
}
