import { Game } from "./entities";

export interface SearchGamesRequest {
  page?: number;
  q?: string;
  platforms?: string[];
}

export interface SearchGamesResponse {
  nextPage: number;
  games: Game[];
  counts: {
    total: number;
    platforms: Record<string, number>;
  };
}

export type GetGameRequest = void;

export type GetGameResponse = Game;
