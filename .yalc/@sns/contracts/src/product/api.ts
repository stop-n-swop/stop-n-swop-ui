import { Game } from "./entities";

export interface SearchGamesRequest {
  page?: number;
  q?: string;
  platformIds?: string[];
  available?: boolean;
  group?: boolean;
  favourites?: boolean;
}
export interface SearchGamesResponse {
  nextPage: number;
  games: Game[];
}

export type GetPopularGamesRequest = {};
export type GetPopularGamesResponse = {
  games: Game[];
};

export type GetGameParams = { gameId: string };
export type GetGameRequest = void;
export type GetGameResponse = Game;

export interface GetSearchCountsRequest {
  q?: string;
  platformIds?: string[];
  available?: boolean;
  favourites?: boolean;
}
export interface GetSearchCountsResponse {
  total: number;
  platforms: Record<string, number>;
}

export type GameViwedParams = { productId: string };
export type GameViewedRequest = void;
export type GameViewedResponse = {};
